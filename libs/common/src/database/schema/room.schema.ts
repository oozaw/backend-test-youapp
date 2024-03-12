import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: false, type: String })
  name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
  members: ObjectId[];

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  createdBy: ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
