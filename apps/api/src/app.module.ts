import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './common/redis/redis.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UploadModule } from './common/upload/upload.module';
import { SendEmailModule } from './common/send-email/send-email.module';
import mailConfig from './common/send-email/config/email-config';
import { PrismaService } from './common/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports:
    [
      AuthModule,
      UserModule,
      ConfigModule.forRoot({ isGlobal: true }),
      JobsModule,
      CacheModule.register({
        isGlobal: true,
        ttl: 300,
      }),
      RedisModule,
      ThrottlerModule.forRoot({
        throttlers: [
          {
            ttl: 300000, // 5 minutes
            limit: 50,
          },
        ],
      }),
      UploadModule,
      ConfigModule.forRoot({
        load: [mailConfig],
        isGlobal: true,
      }),
      SendEmailModule,
    ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { }
