import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RmqModule.register('USER_SERVICE', process.env.RABBITMQ_USER_QUEUE),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
