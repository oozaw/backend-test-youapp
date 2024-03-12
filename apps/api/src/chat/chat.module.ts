import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule, Room, RoomSchema } from '@app/common';
import { ConfigModule } from '@nestjs/config';

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
