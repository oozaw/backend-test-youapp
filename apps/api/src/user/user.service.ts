import { CreateProfileDto, UpdateProfileDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async createProfile(userId: string, dto: CreateProfileDto) {
    return await lastValueFrom(
      this.userClient.send('create_profile', { userId, dto }),
    );
  }

  async getProfile(userId: string) {
    return await lastValueFrom(this.userClient.send('get_profile', { userId }));
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return await lastValueFrom(
      this.userClient.send('update_profile', { userId, dto }),
    );
  }
}
