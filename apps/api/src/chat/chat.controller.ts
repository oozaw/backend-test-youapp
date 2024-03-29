import {
  CreateMessageDto,
  CreateRoomDto,
  GetUser,
  JwtGuard,
} from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ViewMessagesDto } from './dto';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('createRoom')
  async createRoom(
    @Body() dto: CreateRoomDto,
    @GetUser('userId') userId: string,
  ) {
    const room = await this.chatService.createRoom(dto, userId);

    return {
      status: true,
      message: 'Room created successfully',
      data: room,
    };
  }

  @Post('sendMessage')
  sendMessage(
    @Body() dto: CreateMessageDto,
    @GetUser('userId') userId: string,
  ) {
    this.chatService.sendMessage(dto, userId);

    return {
      status: true,
      message: 'Message sent successfully',
    };
  }

  @Get('viewMessages')
  async viewMessages(@Body() dto: ViewMessagesDto) {
    const messages = await this.chatService.findMessagesByRoomId(dto.roomId);

    return {
      status: true,
      message: 'Messages fetched successfully',
      data: messages,
    };
  }
}
