import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/common';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // check if user exists
    const checkEmail = await this.userModel.findOne({ email: dto.email });

    const checkUsername = await this.userModel.findOne({
      username: dto.username,
    });

    if (checkEmail || checkUsername) {
      throw new ForbiddenException({
        status: false,
        message: 'Credentials are already taken',
      });
    }

    // hash password
    const hashedPassword = await argon.hash(dto.password);
    dto.password = hashedPassword;

    // save user to db
    try {
      const user = new this.userModel(dto);
      const result = await user.save();

      const token = await this.signToken(
        result._id,
        result.username,
        result.email,
      );

      return {
        status: true,
        message: 'User created successfully',
        data: {
          _id: result._id,
          username: result.username,
          email: result.email,
          access_token: token.access_token,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDto) {
    // validate user input
    if (!dto.username && !dto.email) {
      throw new ForbiddenException({
        status: false,
        message: 'Username or email is required',
      });
    }

    // check if user exists
    if (!dto.username && dto.email) {
      var checkUser = await this.userModel.findOne({
        email: dto.email,
      });
    } else {
      var checkUser = await this.userModel.findOne({
        username: dto.username,
      });
    }

    // if user does not exist, throw error
    if (!checkUser) {
      throw new ForbiddenException({
        status: false,
        message: 'User not found',
      });
    }

    // if user exists, compare password
    const isPasswordMatch = await argon.verify(
      checkUser.password,
      dto.password,
    );

    // if password is incorrect, throw error
    if (!isPasswordMatch) {
      throw new ForbiddenException({
        status: false,
        message: 'Invalid credentials',
      });
    }

    // if password is correct, generate token
    const token = await this.signToken(
      checkUser._id,
      checkUser.username,
      checkUser.email,
    );

    return {
      status: true,
      message: 'User logged in successfully',
      data: {
        _id: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
        access_token: token.access_token,
      },
    };
  }

  async signToken(
    userId: number,
    username: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, username, email };

    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
