import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { JobsService } from '../providers/jobs.service';
import { CreateJobDto } from '../dto/create-job.dto';
import { Public } from 'src/modules/auth/decoraters/public.decoraters';
import { GetAllJobsQueryDto } from '../dto/get-all-jobs.query.dto';
import { Roles } from 'src/modules/auth/decoraters/roles.decoraters';
import { GetUserJobApplicationsDto } from '../dto/get-user-job-applications.dto';
import { JobApplicationService } from '../providers/job-application.service';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly jobApplicationService: JobApplicationService,
  ) { }

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

  @Roles('USER')
  @Get("job-applications")
  async getMyApplications(@Req() req, @Query() query: GetUserJobApplicationsDto) {
    const userId = req.user.id;

    return this.jobApplicationService.getUserApplications(userId, query);
  }


  @Roles('USER')
  @Post("apply")
  async applyJobApplication(@Req() req, @Query() query: { jobId: string }) {

    const userId = req.user.id;

    return this.jobApplicationService.apply(userId, query.jobId);

  }


}



