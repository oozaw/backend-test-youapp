import { CreateMessageDto } from '@app/common';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { lastValueFrom } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly chatService: ChatService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Connecting client: ${client.id}....`);

    const jwt = client.handshake.auth.access_token ?? null;

    if (!jwt) {
      client.disconnect();
      this.logger.error('Client disconnected: no jwt token');
      return;
    }

    const dataUser = await lastValueFrom(
      this.authClient.send('decode_jwt', { jwt }),
    );

    if (!dataUser) {
      client.disconnect();
      this.logger.error('Client disconnected: invalid jwt token');
      return;
    }

    // save latest user socket id to db
    await this.chatService.createOrUpdateUserSocket(client.id, dataUser.sub);

    // join to rooms that user is in
    await this.joinRooms(client, dataUser.sub);

    // get latest room messages
    await this.getRoomMessages(dataUser.sub).then((rooms) => {
      this.server.to(client.id).emit('latest_room_messages', rooms);
    });

    this.logger.log(`Client connected: {
      id: ${client.id},
      userId: ${dataUser.sub},
      username: ${dataUser.username}
    }`);
  }

  private async joinRooms(client: Socket, userId: string) {
    const rooms = await this.chatService.findRoomsByUserId(userId);

    rooms.forEach((room) => {
      client.join(room.id);
    });
  }

  private async getRoomMessages(userId: string) {
    const rooms = await this.chatService.findRoomsByUserId(userId);

    const roomsConversation = rooms.map(async (room) => {
      const messages = await this.chatService.findMessagesByRoomId(room.id);

      return {
        roomId: room.id,
        messages,
      };
    });

    return roomsConversation;
  }

  async sendMessageToRoom(message: CreateMessageDto) {
    const user = await lastValueFrom(
      this.userClient.send('get_profile', { userId: message.sender }),
    );

    message.sender = user.data.username;

    this.server.to(message.roomId).emit('new_message', message);
  }
}
