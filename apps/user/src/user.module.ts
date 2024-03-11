import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/common/database/schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '@app/common/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
