import { CreateMessageDto, CreateRoomDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
  ) {}

  async createRoom(dto: CreateRoomDto, userId: string) {
    dto.createdBy = userId;
    return await lastValueFrom(this.chatClient.send('create_room', { dto }));
  }

  sendMessage(dto: CreateMessageDto, userId: string) {
    dto.sender = userId;
    return this.chatClient.emit('send_message', { dto });
  }

  async findMessagesByRoomId(roomId: string) {
    return await lastValueFrom(
      this.chatClient.send('find_messages_by_room_id', roomId),
    );
  }

  // async findAllRoomsByUserId(userId: string) {
  //   try {
  //     return await this.roomModel.find({ members: { $in: userId } });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
