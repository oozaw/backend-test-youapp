import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  body: string;

  @Prop({ ref: 'Room', type: SchemaTypes.ObjectId })
  roomId: ObjectId;

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  sender: ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
