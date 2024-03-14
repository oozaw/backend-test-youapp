import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  body: string;

  @Prop({ ref: 'Room', type: String })
  roomId: string;

  @Prop({ ref: 'User', type: String })
  sender: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
