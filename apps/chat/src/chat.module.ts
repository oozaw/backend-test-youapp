import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import {
  DatabaseModule,
  RmqModule,
  RmqService,
  Room,
  RoomSchema,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from 'apps/api/src/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RmqModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
