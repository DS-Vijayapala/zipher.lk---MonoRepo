import { Module } from '@nestjs/common';
import { JobsService } from './providers/jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';
import { JobApplicationService } from './providers/job-application.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, PrismaService, RedisService, JobApplicationService],
})
export class JobsModule { }
