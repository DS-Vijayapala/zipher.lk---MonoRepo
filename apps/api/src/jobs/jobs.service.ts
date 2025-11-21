import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllJobsQueryDto } from './dto/get-all-jobs.query.dto';
import { buildJobWhereQuery, buildSortOrder } from './helpers/job-filters.helper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class JobsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) { }

  async findAllJobs(query: GetAllJobsQueryDto) {

    try {

      // Build cache key

      const cacheKey = this.buildCacheKey(query);

      // Try Redis cache first

      const cached = await this.redisService.get(cacheKey);

      if (cached) {
        return cached;
      }

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

        const emptyResponse = {
          success: true,
          currentPage: safePage,
          perPage: safeLimit,
          totalJobs: total,
          totalPages: Math.ceil(total / safeLimit),
          jobs: [],
        };

        // Cache EMPTY result too

        await this.redisService.set(cacheKey, emptyResponse, 120);

        return emptyResponse;

      }

      // Count applications

      const applicationStats = await this.prismaService.jobApplication.groupBy({
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

      // Build final response
      const response = {
        success: true,
        currentPage: safePage,
        perPage: safeLimit,
        totalJobs: total,
        totalPages: Math.ceil(total / safeLimit),
        jobs: jobsWithCounts,
      };

      // Cache for 15 minutes
      await this.redisService.set(cacheKey, response, 900);

      return response;

    } catch (err) {

      console.error(err);

      throw new InternalServerErrorException("Failed to fetch jobs");

    }
  }

  async getJobDataById(jobId: string, userId: string | null) {

    // Build cache key

    const cacheKey = this.buildJobDetailKey(jobId, userId);

    // Check cache first

    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      return cached;
    }

    // Query job + applied status in parallel

    const jobPromise = this.prismaService.job.findUnique({
      where: { id: jobId },
      include: {
        user: { select: { id: true, name: true, image: true } }
      }
    });

    const appliedPromise = userId
      ? this.prismaService.jobApplication.findFirst({
        where: { jobId, userId },
        select: { id: true }
      })
      : Promise.resolve(null);

    const [job, applied] = await Promise.all([jobPromise, appliedPromise]);

    if (!job) throw new NotFoundException("Job not found");

    // Fetch recommended jobs

    const recommended = await this.prismaService.job.findMany({
      where: {
        userID: job.user.id,
        id: { not: jobId },
        visible: true,
        ...(userId
          ? { applications: { none: { userId } } }
          : {})
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

    // Final response

    const response = {
      job,
      isApplied: Boolean(applied),
      relatedJobs: recommended
    };

    // 6: Cache for 15 minutes

    await this.redisService.set(cacheKey, response, 900);

    return response;

  }

  // ---------------------------- HELPER METHODS ----------------------------


  private buildCacheKey(query: GetAllJobsQueryDto): string {
    const {
      page = 1,
      limit = 15,
      title = '',
      category = '',
      location = '',
      level = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = query;

    return `jobs:list:${page}:${limit}:${title}:${category}:${location}:${level}:${sortBy}:${sortOrder}`;
  }

  private buildJobDetailKey(jobId: string, userId: string | null): string {
    return `job:detail:${jobId}:${userId ?? "guest"}`;
  }



}
