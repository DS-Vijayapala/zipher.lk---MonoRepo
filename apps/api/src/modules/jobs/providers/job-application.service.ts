import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import {
    ApplicationStatusFilter,
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    GetUserJobApplicationsDto
} from "../dto/get-user-job-applications.dto";
import { JobsService } from "./jobs.service";
import { RedisService } from "src/common/redis/redis.service";


@Injectable()
export class JobApplicationService {

    private readonly logger = new Logger(JobApplicationService.name);

    private readonly APPLY_COST = 5;

    constructor(
        private prisma: PrismaService,
        private jobService: JobsService,
        private redisService: RedisService
    ) { }

    async getUserApplications(
        userId: string,
        query: GetUserJobApplicationsDto
    ) {

        try {

            const page = Number(query.page) || DEFAULT_PAGE;

            const limit = Number(query.limit) || DEFAULT_LIMIT;

            const skip = (page - 1) * limit;

            const where: any = { userId };

            if (query.status !== ApplicationStatusFilter.ALL) {
                where.status = query.status;
            }

            // DB FETCH WITH SAFE ERROR HANDLING

            const applications = await this.prisma.jobApplication.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    job: {
                        include: {
                            user: { select: { name: true, image: true } },
                        },
                    },
                    user: { select: { name: true, image: true } },
                },
            });

            const totalAppliedJobs = await this.prisma.jobApplication.count({ where });

            const allpages = Math.ceil(totalAppliedJobs / limit);

            return {
                success: true,
                data: {
                    totalAppliedJobs,
                    page,
                    limit,
                    allpages,
                    status: query.status,
                },
                applications,
            };

        } catch (error) {

            this.logger.error("Failed to fetch job applications", error);
            throw new InternalServerErrorException(
                "Unable to fetch job applications. Please try again later."
            );

        }

    }

    async apply(userId: string, jobId: string) {

        const dashboardCacheKey = `dashboardData:${userId}`;

        // Validate jobId
        if (!jobId) {
            throw new BadRequestException("Missing job ID");
        }

        // Check duplicate application
        const existing = await this.prisma.jobApplication.findFirst({
            where: { jobId, userId },
        });

        if (existing) {
            throw new BadRequestException("Already applied for this job.");
        }

        // Validate job
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            select: { userID: true },
        });

        if (!job) {
            throw new NotFoundException("Job not found");
        }

        if (job.userID === userId) {
            throw new ForbiddenException("Cannot apply to your own job post.");
        }

        // Check user points
        const available = await this.jobService.getAvailableUserPoints(userId);

        if (available < this.APPLY_COST) {
            throw new ForbiddenException({
                message: "Not enough points to apply.",
                currently_available_point: available,
            });
        }

        // Create application
        await this.prisma.jobApplication.create({
            data: {
                jobId,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        // Deduct cost
        await this.jobService.deductUserPoints(userId, this.APPLY_COST);

        const updatedPoints = await this.jobService.getAvailableUserPoints(userId);

        await this.redisService.delPattern("jobs:list:*");

        await this.redisService.del(dashboardCacheKey);

        return {
            success: true,
            message: "Applied successfully",
            currently_available_point: updatedPoints,
        };
    }

}
