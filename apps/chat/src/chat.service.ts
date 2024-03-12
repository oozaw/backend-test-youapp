import {
  CreateMessageDto,
  Message,
  MessageDocument,
  Room,
  RoomDocument,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from '@app/common';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(dto: CreateRoomDto) {
    try {
      return await this.roomModel.create(dto);
    } catch (error) {
      throw error;
    }
  }

  async findMessagesByRoomId(roomId: string): Promise<Message[]> {
    try {
      return await this.messageModel.find({ roomId: roomId });
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(dto: CreateMessageDto) {
    try {
      return await this.messageModel.create(dto);
    } catch (error) {
      throw error;
    }
  }
}
