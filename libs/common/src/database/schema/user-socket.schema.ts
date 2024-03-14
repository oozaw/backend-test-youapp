import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserSocketDocument = UserSocket & Document;

@Schema({ timestamps: true })
export class UserSocket {
  @Prop({ required: true, type: String })
  socketId: string;

  @Prop({ required: true, type: String })
  userId: string;
}

export const UserSocketSchema = SchemaFactory.createForClass(UserSocket);
