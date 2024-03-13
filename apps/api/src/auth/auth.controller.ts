import { ApiCustomResponse, LoginDto, RegisterDto } from '@app/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCustomResponse({ status: 201, description: 'User created successfully' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @ApiCustomResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
