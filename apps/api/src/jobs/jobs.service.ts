import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllJobsQueryDto } from './dto/get-all-jobs.query.dto';
import { buildJobWhereQuery, buildSortOrder } from './helpers/job-filters.helper';

@Injectable()
export class JobsService {

  constructor(private readonly prismaService: PrismaService) { }

  async findAllJobs(query: GetAllJobsQueryDto) {

    try {

      const {
        page = 1,
        limit = 15,
        title,
        category,
        location,
        level,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = query;

      const safeLimit = Math.min(Math.max(limit, 1), 50);

      const safePage = Math.max(1, Math.trunc(page));

      const skip = (safePage - 1) * safeLimit;

      // Use Helper Functions

      const where = buildJobWhereQuery({
        title,
        category,
        location,
        level,
      });

      const orderBy = buildSortOrder(sortBy, sortOrder);

      const [jobs, total] = await Promise.all([

        this.prismaService.job.findMany({
          skip,
          take: safeLimit,
          where,
          orderBy,
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            location: true,
            jobType: true,
            level: true,
            salary: true,
            date: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                name: true,
                image: true,
                location: true,
              },
            },
          },
        }),

        this.prismaService.job.count({ where }),

      ]);

      // Extract job IDs

      const jobIds = jobs.map((job) => job.id);

      if (jobIds.length === 0) {

        return {
          success: true,
          currentPage: safePage,
          perPage: safeLimit,
          totalJobs: total,
          totalPages: Math.ceil(total / safeLimit),
          jobs: [],
        };

      }

      // Count applications

      const applicationStats =
        await this.prismaService.jobApplication.groupBy({
          by: ["jobId"],
          _count: { jobId: true },
          where: { jobId: { in: jobIds } },
        });

      const countMap = new Map(
        applicationStats.map((s) => [s.jobId, s._count.jobId])
      );

      // Add count to jobs

      const jobsWithCounts = jobs.map((job) => ({
        ...job,
        applicationCount: countMap.get(job.id) ?? 0,
      }));

      // Final response

      return {
        success: true,
        currentPage: safePage,
        perPage: safeLimit,
        totalJobs: total,
        totalPages: Math.ceil(total / safeLimit),
        jobs: jobsWithCounts,
      };

    } catch (err) {

      console.error(err);

      throw new InternalServerErrorException("Failed to fetch jobs");

    }

  }

  async getJobData(jobId: string, userId: string) {
    const jobPromise = this.prismaService.job.findUnique({
      where: { id: jobId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    });

    const appliedPromise = this.prismaService.jobApplication.findFirst({
      where: {
        jobId,
        userId
      },
      select: { id: true }
    });

    const [job, applied] = await Promise.all([
      jobPromise,
      appliedPromise
    ]);

    if (!job) throw new NotFoundException("Job not found");

    // Recommended jobs by same poster (NOT applied by user)
    const recommended = await this.prismaService.job.findMany({
      where: {
        userID: job.userID,
        id: { not: jobId },
        applications: {
          none: {
            userId // user didn't apply
          }
        },
        visible: true
      },
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        location: true,
        category: true,
        level: true,
        jobType: true,
        createdAt: true,
        user: {
          select: { name: true, image: true }
        }
      }
    });

    return {
      job,
      isApplied: Boolean(applied),
      relatedJobs: recommended
    };
  }



}
