import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ApplicationStatus, Prisma } from '@prisma/client';

@Injectable()
export class JobApplicantsProvider {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    // Get job applicants

    async getApplicants(
        ownerId: string,
        status: ApplicationStatus | undefined,
        page: number,
        limit: number,
    ) {
        try {
            const where: Prisma.JobApplicationWhereInput = {
                job: {
                    userID: ownerId,
                },
                ...(status && { status }),
                NOT: {
                    userId: ownerId, // prevent self-apply
                },
            };

            const [data, total] = await this.prisma.$transaction([
                this.prisma.jobApplication.findMany({
                    where,
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                                resume: true,
                            },
                        },
                        job: {
                            select: {
                                id: true,
                                title: true,
                                location: true,
                            },
                        },
                    },
                }),
                this.prisma.jobApplication.count({ where }),
            ]);

            return {
                success: true,
                message: 'Job applications fetched successfully.',
                data,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Get applicants error:', error);

            throw new InternalServerErrorException(
                'Unable to fetch job applications at the moment. Please try again later.',
            );
        }
    }
    // Update application status

    async updateStatus(
        applicationId: string,
        status: ApplicationStatus,
    ) {
        try {
            const application = await this.prisma.jobApplication.findUnique({
                where: { id: applicationId },
                select: { id: true },
            });

            if (!application) {
                throw new NotFoundException(
                    'Job application not found.',
                );
            }

            await this.prisma.jobApplication.update({
                where: { id: applicationId },
                data: { status },
            });

            return {
                success: true,
                message: 'Application status updated successfully.',
            };

        } catch (error) {

            console.error('Update application status error:', error);

            if (error instanceof NotFoundException) {
                throw error;
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(
                    'Invalid request. Unable to update application status.',
                );
            }

            throw new InternalServerErrorException(
                'Failed to update application status. Please try again later.',
            );

        }

    }

}
