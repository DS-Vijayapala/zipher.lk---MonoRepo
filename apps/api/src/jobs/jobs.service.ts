import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllJobsQueryDto } from './dto/get-all-jobs.query.dto';

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

      // Prevent array injection — sanitize inputs

      const sanitize = (val?: unknown, max = 60): string | undefined => {

        if (!val || typeof val !== "string") return undefined;

        const clean = val.trim();

        return clean.length > max ? clean.substring(0, max) : clean;

      };

      const sTitle = sanitize(title, 100);

      const sLocation = sanitize(location, 50);

      const sCategory = sanitize(category, 50);

      const sLevel = sanitize(level, 30);

      const where: any = { visible: true };

      if (sTitle) where.title = { contains: sTitle, mode: "insensitive" };

      if (sCategory) where.category = { equals: sCategory, mode: "insensitive" };

      if (sLocation) where.location = { equals: sLocation, mode: "insensitive" };

      if (sLevel) where.level = { equals: sLevel, mode: "insensitive" };

      const orderBy: any = {};
      orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";

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
            level: true,
            salary: true,
            date: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                location: true,
              },
            },
          },
        }),

        this.prismaService.job.count({ where }),

      ]);

      return {
        success: true,
        currentPage: safePage,
        perPage: safeLimit,
        totalJobs: total,
        totalPages: Math.ceil(total / safeLimit),
        jobs,
      };

    } catch (err) {
      throw new InternalServerErrorException("Failed to fetch jobs");
    }

  }

}
