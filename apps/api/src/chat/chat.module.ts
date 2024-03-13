import { RmqModule, Room, RoomSchema } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    RmqModule.register('CHAT_SERVICE', process.env.RABBITMQ_CHAT_QUEUE),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
