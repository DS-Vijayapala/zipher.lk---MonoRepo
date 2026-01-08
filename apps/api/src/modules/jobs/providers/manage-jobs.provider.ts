import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/common/prisma/prisma.service"

@Injectable()
export class ManageJobsProvider {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getUserJobs(
        userId: string,
        page: number,
        limit: number
    ) {
        const skip = (page - 1) * limit

        const [jobs, total] = await Promise.all([
            this.prisma.job.findMany({
                where: { userID: userId },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    _count: {
                        select: { applications: true },
                    },
                },
            }),

            this.prisma.job.count({
                where: { userID: userId },
            }),
        ])

        return {
            data: jobs.map((job) => ({
                id: job.id,
                title: job.title,
                location: job.location,
                postedAt: job.createdAt,
                visible: job.visible,
                applicants: job._count.applications,
            })),
            total,
        }
    }

    async toggleVisibility(userId: string, jobId: string) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            select: { id: true, userID: true, visible: true },
        })

        if (!job) {
            throw new NotFoundException("Job not found")
        }

        if (job.userID !== userId) {
            throw new ForbiddenException("You cannot modify this job")
        }

        return this.prisma.job.update({
            where: { id: jobId },
            data: { visible: !job.visible },
            select: {
                id: true,
                visible: true,
            },
        })
    }
}
