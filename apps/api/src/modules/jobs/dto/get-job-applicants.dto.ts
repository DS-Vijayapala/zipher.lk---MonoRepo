import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '@prisma/client';

export class GetJobApplicantsDto {
    @IsOptional()
    @IsEnum(ApplicationStatus)
    status?: ApplicationStatus;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 6;
}
