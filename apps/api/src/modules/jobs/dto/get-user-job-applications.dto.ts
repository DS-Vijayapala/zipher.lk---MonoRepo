import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsEnum, Max, Min, IsInt } from "class-validator";
import { GetAllJobsQueryDto } from "./get-all-jobs.query.dto";
import { Type } from "class-transformer";


export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 10;

export enum ApplicationStatusFilter {
    ALL = "ALL",
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected",
}

export class GetUserJobApplicationsDto extends PartialType(GetAllJobsQueryDto) {
    @IsOptional()
    @IsEnum(ApplicationStatusFilter)
    status: ApplicationStatusFilter = ApplicationStatusFilter.ALL;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(15, { message: "Limit cannot exceed 15" })
    limit: number = DEFAULT_LIMIT;
}
