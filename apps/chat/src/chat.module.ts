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
import { MessageSchema } from '@app/common';
import { ChatGateway } from './chat.gateway';
import { UserSocket, UserSocketSchema } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    RmqModule,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Message.name, schema: MessageSchema },
      { name: UserSocket.name, schema: UserSocketSchema },
    ]),
    RmqModule.register('USER_SERVICE', process.env.RABBITMQ_USER_QUEUE),
    RmqModule.register('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
