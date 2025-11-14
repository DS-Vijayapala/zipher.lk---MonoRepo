import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Secure HTTP Headers (Helmet)

  app.use(
    helmet({
      contentSecurityPolicy: false, // disable for APIs
      crossOriginEmbedderPolicy: false,
    })
  );

  // Rate Limiting (protect against abuse)

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 300,              // max 300 reqs per 15 min per IP
      standardHeaders: true,
      legacyHeaders: false,
    })
  );


  // CORS Hardening

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://zipher.lk',
      'https://www.zipher.lk',
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  // Global Validation

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  // API Prefix

  app.setGlobalPrefix('api/v2');

  // Compression (performance)

  app.use(compression());

  // Disable X-Powered-By

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // Start Server

  await app.listen(process.env.PORT ?? 4000);

  console.log(`API running at http://localhost:${process.env.PORT ?? 4000}`);

}

bootstrap();
