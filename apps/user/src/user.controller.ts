import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { ApiCustomResponse, GetUser } from '@app/common';
import { JwtGuard } from '@app/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCustomResponse({
    status: 201,
    description: 'Profile created successfully',
  })
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

  @ApiCustomResponse({
    status: 200,
    description: 'Profile fetched successfully',
  })
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

  @ApiCustomResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
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
