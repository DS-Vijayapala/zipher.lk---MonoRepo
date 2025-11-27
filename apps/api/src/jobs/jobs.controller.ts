import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DEFAULT_PAGE_LIMIT } from './lib/constants';
import { Public } from 'src/auth/decoraters/public.decoraters';
import { GetAllJobsQueryDto } from './dto/get-all-jobs.query.dto';
import { Roles } from 'src/auth/decoraters/roles.decoraters';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

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
    const userId = req.user?.sub || null;
    return this.jobsService.getJobDataById(id, userId);
  }

  @Roles('USER')
  @Post("post-job")
  async postJob(@Req() req: any, @Body() createJobDto: CreateJobDto) {
    const userId = req.user?.id;
    console.log(userId);

    return this.jobsService.postJob(userId, createJobDto);
  }





}



