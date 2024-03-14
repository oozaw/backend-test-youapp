import {
  CreateMessageDto,
  CreateRoomDto,
  Message,
  MessageDocument,
  Room,
  RoomDocument,
  UserSocket,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    @InjectModel(UserSocket.name)
    private readonly userSocketModel: Model<UserSocket>,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async createRoom(dto: CreateRoomDto) {
    try {
      return await this.roomModel.create(dto);
    } catch (error) {
      throw error;
    }
  }

  async findRoomsByUserId(userId: string) {
    try {
      return await this.roomModel.find({ members: userId });
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(dto: CreateMessageDto) {
    try {
      // check if room exists
      const room = await this.roomModel.findById(dto.roomId);

      if (!room) {
        throw new Error('Room does not exist');
      }

      // check if sender exists
      const user = await lastValueFrom(
        this.userClient.send('get_profile', {
          userId: dto.sender,
        }),
      );

      if (!user) {
        throw new Error('User does not exist');
      }

      // check if users are registered in the room
      if (!room.members.includes(dto.sender)) {
        throw new Error('User is not registered in the room');
      }

      // create message instance
      const message = await this.messageModel.create(dto);

      return message;
    } catch (error) {
      throw error;
    }
  }

  async findMessagesByRoomId(roomId: string) {
    try {
      return await this.messageModel.find({ roomId: roomId });
    } catch (error) {
      throw error;
    }
  }

  async createOrUpdateUserSocket(socketId: string, userId: string) {
    try {
      const userSocket = await this.userSocketModel.findOne({ userId });

      if (userSocket) {
        userSocket.socketId = socketId;
        return await userSocket.save();
      }

      return await this.userSocketModel.create({ socketId, userId });
    } catch (error) {
      throw error;
    }
  }

  async findUserSocketByUserId(userId: string) {
    try {
      return await this.userSocketModel.findOne({ userId });
    } catch (error) {
      throw error;
    }
  }
}
