import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import {
  DatabaseModule,
  Message,
  RmqModule,
  Room,
  RoomSchema,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessageSchema } from '@app/common/database/schema/message.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RmqModule,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
