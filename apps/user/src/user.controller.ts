import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto, RmqService, UpdateProfileDto } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('create_profile')
  async createProfile(
    @Payload() data: { userId: string; dto: CreateProfileDto },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    const user = await this.userService.createProfile(data.userId, data.dto);

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

  @MessagePattern('get_profile')
  async getProfile(
    @Payload() data: { userId: string },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    const user = await this.userService.findOne(data.userId);

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

  @MessagePattern('update_profile')
  async updateProfile(
    @Payload() data: { userId: string; dto: UpdateProfileDto },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    const user = await this.userService.updateProfile(data.userId, data.dto);

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
