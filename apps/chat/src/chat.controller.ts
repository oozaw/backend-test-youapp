import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateMessageDto, CreateRoomDto, RmqService } from '@app/common';
import { ChatGateway } from './chat.gateway';

@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('create_room')
  async createRoom(
    @Payload() data: { dto: CreateRoomDto },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.chatService.createRoom(data.dto);
  }

  @EventPattern('send_message')
  async sendMessage(
    @Payload() data: { dto: CreateMessageDto },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    const createdMessage = await this.chatService.sendMessage(data.dto);
    this.chatGateway.sendMessageToRoom(createdMessage);
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
