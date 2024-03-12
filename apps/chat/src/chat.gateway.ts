import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}

  handleDisconnect(socket: Socket) {
    console.log('Client disconnected:', socket.id);
  }

  handleConnection(socket: Socket) {
    console.log('Connecting Client:', socket.id);

    const jwt = socket.handshake.headers.authorization ?? null;

    if (!jwt) {
      this.handleDisconnect(socket);
      return;
    }
  }
}
