import { Transform } from "class-transformer";
import {
    IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsArray,
    ArrayMinSize, ArrayMaxSize, IsNumberString, Matches, IsNumber, IsPositive
} from "class-validator";
import { sanitizeText } from "../../common/utils/sanitize.util";

const SAFE_REGEX = /^[a-zA-Z0-9\u00C0-\u024F0-9\s.,;:'"()!?+\-@#&*/]+$/u;

export class CreateJobDto {

    @Transform(({ value }) => sanitizeText(value))
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(120)
    @Matches(SAFE_REGEX, { message: "Invalid characters in title" })
    title: string;

    @Transform(({ value }) => sanitizeText(value))
    @IsString()
    @IsNotEmpty()
    @MaxLength(4000) // allow long but we also restrict words below
    @Matches(SAFE_REGEX, { message: "Invalid characters in description" })
    description: string;

    @Transform(({ value }) => sanitizeText(value))
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @Matches(SAFE_REGEX, { message: "Invalid characters in location" })
    location: string;

    @Transform(({ value }) => sanitizeText(value))
    @IsString()
    @IsNotEmpty()
    category: string;

    @Transform(({ value }) => sanitizeText(value))
    @IsString()
    @IsNotEmpty()
    level: string;

    @IsOptional()
    // salary arrives as string from client; transform on service
    @Matches(/^[0-9]{1,12}$/, { message: "Invalid salary format" })
    salary?: string;

    @Transform(({ value }) => sanitizeText(value))
    @IsOptional()
    bannerImage?: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    requirements: string[];

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    qualifications: string[];
}
