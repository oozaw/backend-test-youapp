import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateRoomDto, Message, RmqService } from '@app/common';

@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('create_room')
  async createRoom(
    @Payload() data: { dto: CreateRoomDto; userId: string },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    console.log(data);
    return await this.chatService.createRoom(data.dto, data.userId);
  }

  @EventPattern('send_message')
  sendMessage(
    @Payload() data: { roomId: string; message: Message },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return this.chatService.sendMessage(data.roomId, data.message);
  }

  @MessagePattern('find_messages_by_room_id')
  async findMessagesByRoomId(
    @Payload() roomId: string,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.chatService.findMessagesByRoomId(roomId);
  }
}
