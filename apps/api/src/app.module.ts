import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './common/redis/redis.module';

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
    ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
