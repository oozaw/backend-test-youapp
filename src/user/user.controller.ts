import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('createProfile')
  async createProfile(
    @GetUser('userId') userId: string,
    @Body() dto: CreateProfileDto,
  ) {
    const user = await this.userService.createProfile(userId, dto);

    return {
      status: true,
      message: 'Profile created successfully',
      data: {
        email: user.email,
        username: user.username,
        name: user.name,
        gender: user.gender,
        birthday: user.birthday,
        horoscope: user.horoscope,
        zodiac: user.zodiac,
        height: user.height,
        weight: user.weight,
        interests: user.interests,
      },
    };
  }

  @Get('getProfile')
  async getProfile(@GetUser('userId') userId: string) {
    const user = await this.userService.findOne(userId);

    return {
      status: true,
      message: 'Profile fetched successfully',
      data: {
        email: user.email,
        username: user.username,
        name: user.name,
        gender: user.gender,
        birthday: user.birthday,
        horoscope: user.horoscope,
        zodiac: user.zodiac,
        height: user.height,
        weight: user.weight,
        interests: user.interests,
      },
    };
  }

  @Patch('updateProfile')
  async updateProfile(
    @GetUser('userId') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    const user = await this.userService.updateProfile(userId, dto);

    return {
      status: true,
      message: 'Profile updated successfully',
      data: {
        email: user.email,
        username: user.username,
        name: user.name,
        gender: user.gender,
        birthday: user.birthday,
        horoscope: user.horoscope,
        zodiac: user.zodiac,
        height: user.height,
        weight: user.weight,
        interests: user.interests,
      },
    };
  }
}
