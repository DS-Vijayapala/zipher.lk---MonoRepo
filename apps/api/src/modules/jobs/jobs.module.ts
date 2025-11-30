import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, PrismaService, RedisService],
})
export class JobsModule { }
