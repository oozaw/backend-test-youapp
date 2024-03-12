import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto, GetUser, JwtGuard } from '@app/common';
import { Message } from '@app/common';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('createRoom')
  createRoom(@Body() dto: CreateRoomDto, @GetUser('userId') userId: string) {
    const room = this.chatService.createRoom(dto, userId);

    return {
      status: 'success',
      message: 'Room created successfully',
      data: room,
    };
  }

  @Post('sendMessage')
  sendMessage(@Body() body: { roomId: string; message: Message }) {
    this.chatService.sendMessage(body.roomId, body.message);

    return {
      status: 'success',
      message: 'Message sent successfully',
    };
  }

  @Get('viewMessages')
  viewMessages(@Body() roomId: string) {
    return this.chatService.findMessagesByRoomId(roomId);
  }
}
