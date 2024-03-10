import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('YouApp Backend API Test')
    .setDescription('YouApp Backend API Test')
    .setVersion('1.0')
    .addTag('youapp')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apiDocs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
