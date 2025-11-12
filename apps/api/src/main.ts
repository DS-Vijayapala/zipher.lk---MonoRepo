import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'console';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // Validation Middleware
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.PORT ?? 4000);

  console.log(`API is running on http://localhost:${process.env.PORT ?? 4000}`);

}

bootstrap();
