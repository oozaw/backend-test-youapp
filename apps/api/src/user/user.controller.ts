import {
  ApiCustomResponse,
  CreateProfileDto,
  GetUser,
  JwtGuard,
  UpdateProfileDto,
} from '@app/common';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCustomResponse({
    status: 201,
    description: 'Profile created successfully',
  })
  @Post('createProfile')
  async createProfile(
    @GetUser('userId') userId: string,
    @Body() dto: CreateProfileDto,
  ) {
    return await this.userService.createProfile(userId, dto);
  }

  @ApiCustomResponse({
    status: 200,
    description: 'Profile fetched successfully',
  })
  @Get('getProfile')
  async getProfile(@GetUser('userId') userId: string) {
    return await this.userService.getProfile(userId);
  }

  @ApiCustomResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @Patch('updateProfile')
  async updateProfile(
    @GetUser('userId') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return await this.userService.updateProfile(userId, dto);
  }
}
