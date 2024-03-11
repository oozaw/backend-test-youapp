import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  const queue = configService.get<string>('RABBITMQ_AUTH_QUEUE');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice(rmqService.getOptions(queue));

  await app.startAllMicroservices();
}
bootstrap();
