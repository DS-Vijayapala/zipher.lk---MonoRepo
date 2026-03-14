import { IsInt, IsOptional, Min } from "class-validator"
import { Type } from "class-transformer"
import { IsMongoId } from "class-validator"

export class ManageJobsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10
}

export class ToggleJobVisibilityDto {
    @IsMongoId()
    jobId: string
}
