import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateRoomDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
  ) {}

  createRoom(dto: CreateRoomDto, userId: string): Observable<any> {
    dto.createdBy = userId;
    return this.chatClient.send('create_room', { dto });
  }

  sendMessage(dto: CreateMessageDto, userId: string) {
    dto.sender = userId;
    return this.chatClient.emit('send_message', { dto });
  }

  findMessagesByRoomId(roomId: string): Observable<any> {
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
