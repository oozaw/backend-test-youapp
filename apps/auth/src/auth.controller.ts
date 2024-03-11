import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '@app/common';

@ApiTags('auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCustomResponse({ status: 201, description: 'User created successfully' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiCustomResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
