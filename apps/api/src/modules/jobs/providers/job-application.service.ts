import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import {
    ApplicationStatusFilter,
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    GetUserJobApplicationsDto
} from "../dto/get-user-job-applications.dto";


@Injectable()
export class JobApplicationService {

    private readonly logger = new Logger(JobApplicationService.name);

    constructor(private prisma: PrismaService) { }

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

}
