import { LoginDto, RegisterDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async register(dto: RegisterDto) {
    return await lastValueFrom(this.authClient.send('register_user', { dto }));
  }

  async login(dto: LoginDto) {
    return await lastValueFrom(this.authClient.send('login_user', { dto }));
  }
}
