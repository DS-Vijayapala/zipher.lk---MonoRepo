import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { DEFAULT_PAGE_LIMIT } from '../lib/constants';

export class GetAllJobsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsPositive()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsPositive()
    limit: number = DEFAULT_PAGE_LIMIT;
}
