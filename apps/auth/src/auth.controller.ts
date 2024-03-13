import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { LoginDto, RegisterDto, RmqService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('register_user')
  async register(
    @Payload() data: { dto: RegisterDto },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.authService.register(data.dto);
  }

  @MessagePattern('login_user')
  async login(@Payload() data: { dto: LoginDto }, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return await this.authService.login(data.dto);
  }

  @MessagePattern('validate_jwt')
  async validateJwt(
    @Payload() data: { jwt: string },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.authService.validateJwt(data.jwt);
  }

  @MessagePattern('decode_jwt')
  async decodeJwt(
    @Payload() data: { jwt: string },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.authService.getUserFromJwt(data.jwt);
  }
}
