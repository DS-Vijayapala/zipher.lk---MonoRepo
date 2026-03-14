import { Type } from "class-transformer";
import {
    IsInt,
    IsOptional,
    Min,
    Max,
    IsString,
    Length,
    IsIn,
} from "class-validator";
import { DEFAULT_PAGE_LIMIT } from "../lib/constants";

export class GetAllJobsQueryDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit: number = DEFAULT_PAGE_LIMIT;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(0, 50)
    location?: string;

    @IsOptional()
    @IsString()
    @Length(0, 50)
    category?: string;

    @IsOptional()
    @IsString()
    @Length(0, 30)
    level?: string;

    // Sorting controls

    @IsOptional()
    @IsString()
    @IsIn(["createdAt", "salary", "date"])
    sortBy?: "createdAt" | "salary" | "date";

    @IsOptional()
    @IsString()
    @IsIn(["asc", "desc"])
    sortOrder?: "asc" | "desc";

}
