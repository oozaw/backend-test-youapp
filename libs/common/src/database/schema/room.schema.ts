import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: false, type: Boolean, default: false })
  isPrivate?: boolean;

  @Prop({ type: String, required: false })
  password?: string;

  @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
  members: ObjectId[];

  @Prop({ type: [Object] })
  messages: object[];

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  createdBy: ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
