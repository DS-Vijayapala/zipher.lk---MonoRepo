import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
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

  @Public()
  @Get("job-data/:id")
  async getJobData(
    @Param("id") id: string,
    @Req() req: any
  ) {
    const userId = req.user?.sub; // Extract current user ID from JWT
    return this.jobsService.getJobData(id, userId);
  }





}



