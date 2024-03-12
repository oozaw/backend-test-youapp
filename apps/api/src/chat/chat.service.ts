import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from '@app/common';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
  ) {}

  createRoom(dto: CreateRoomDto, userId: string) {
    const result = this.chatClient.send('create_room', { dto, userId });

    result.subscribe();

    return result;
  }

  sendMessage(roomId: string, message: Message) {
    return this.chatClient.emit('send_message', { roomId, message });
  }

  findMessagesByRoomId(roomId: string) {
    return this.chatClient.send('find_messages_by_room_id', roomId);
  }

  // async findAllRoomsByUserId(userId: string) {
  //   try {
  //     return await this.roomModel.find({ members: { $in: userId } });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
