import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DEFAULT_PAGE_LIMIT } from './lib/constants';
import { Public } from 'src/auth/decoraters/public.decoraters';
import { GetAllJobsQueryDto } from './dto/get-all-jobs.query.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Public()
  @Get('all-jobs')
  async findAllJobs(
    @Query() queryDTO: GetAllJobsQueryDto
  ) {
    return this.jobsService.findAllJobs(queryDTO);
  }
}



