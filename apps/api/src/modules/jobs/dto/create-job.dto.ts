import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { Sanitize } from "../decorators/dto/sanitize-text.decorator";
import { IsSafeText } from "../decorators/dto/safe-text.decorator";
import { MaxWords } from "../decorators/dto/word-count.validator";
import { IsValidTextArray } from "../decorators/dto/validated-array.decorator";

export const SAFE_REGEX = /^[\p{L}\p{N}\p{M}\p{Pd}\p{Pc}\p{Zs}.,;:'’"()!?+\-@#&*/]+$/u;

export class CreateJobDto {
    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsSafeText({ message: "Title contains invalid characters" })
    title: string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @MaxWords(200)
    @IsSafeText({ message: "Description contains invalid characters" })
    description: string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsSafeText({ message: "Location contains invalid characters" })
    location: string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsSafeText({ message: "Category contains invalid characters" })
    category: string;

    @Sanitize()
    @IsString()
    @IsNotEmpty()
    @IsSafeText({ message: "Level contains invalid characters" })
    level: string;

    @IsOptional()
    @IsNumber()
    salary?: number;

    @Sanitize()
    @IsString()
    @IsOptional()
    bannerImage?: string;

    @IsValidTextArray(20)
    requirements: string[];

    @IsValidTextArray(20)
    qualifications: string[];
}
