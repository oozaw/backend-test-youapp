import { Message, Room, RoomDocument } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from '@app/common';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(dto: CreateRoomDto, userId: string) {
    try {
      dto.createdBy = userId;
      return await this.roomModel.create(dto);
    } catch (error) {
      throw error;
    }
  }

  async findMessagesByRoomId(roomId: string): Promise<Message[]> {
    try {
      return await this.roomModel.find({ members: { $in: [roomId] } });
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(roomId: string, message: object) {
    try {
      return await this.roomModel.findByIdAndUpdate(
        roomId,
        { $push: { messages: message } },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }
}
