import { Module } from '@nestjs/common';
import { JobsService } from './providers/jobs.service';
import { JobsController } from './controllers/jobs.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';
import { JobApplicationService } from './providers/job-application.service';
import { JobApplicantsController } from './controllers/job-applicants.controller';
import { JobApplicantsProvider } from './providers/job-applicants.provider';
import { ManageJobsController } from './controllers/manage-jobs.controller';
import { ManageJobsProvider } from './providers/manage-jobs.provider';

@Module({
  controllers: [JobsController, JobApplicantsController, ManageJobsController],
  providers: [
    JobsService,
    PrismaService,
    RedisService,
    JobApplicationService,
    JobApplicantsProvider,
    ManageJobsProvider
  ],
})
export class JobsModule { }
