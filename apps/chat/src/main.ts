import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);

  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  const queue = configService.get<string>('RABBITMQ_CHAT_QUEUE');

  app.connectMicroservice(rmqService.getOptions(queue));
  await app.startAllMicroservices();
}
bootstrap();
