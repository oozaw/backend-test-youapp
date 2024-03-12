import { Prop } from '@nestjs/mongoose';

export class CreateMessageDto {
  @Prop()
  body: string;

  @Prop({ ref: 'User', type: String })
  sender: string;

  @Prop()
  createdAt: Date;
}
