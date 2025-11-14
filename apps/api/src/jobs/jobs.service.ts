import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllJobsQueryDto } from './dto/get-all-jobs.query.dto';

@Injectable()
export class JobsService {

  constructor(private readonly prismaService: PrismaService) { }

  async findAllJobs({
    page,
    limit,
  }: GetAllJobsQueryDto) {

    // Prevent misuse

    const safeLimit = Math.min(Math.max(limit, 1), 50); // Max 50 per request

    const skip = (page - 1) * safeLimit;

    // Query DB

    const [jobs, total] = await Promise.all([

      this.prismaService.job.findMany({
        skip,
        take: safeLimit,
        where: { visible: true },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          category: true,
          description: true,
          location: true,
          level: true,
          salary: true,
          createdAt: true,
        },

      }),

      this.prismaService.job.count({
        where: { visible: true },
      }),

    ]);

    const totalPages = Math.ceil(total / safeLimit);

    return {
      success: true,
      currentPage: page,
      perPage: safeLimit,
      totalJobs: total,
      totalPages,
      jobs,
    };

  }

}
