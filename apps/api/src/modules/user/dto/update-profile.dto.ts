import {
    IsOptional,
    IsString,
    MaxLength,
    IsUrl,
    Matches,
} from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(?:\+94|94|0)(7[01245678])[0-9]{7}$/, {
        message: 'Phone number must be a valid Sri Lankan mobile number',
    })
    phone?: string;

    @IsOptional()
    @IsString()
    currentPosition?: string;

    @IsOptional()
    @IsString()
    @MaxLength(125)
    description?: string;

    @IsOptional()
    @IsUrl()
    linkedin?: string;

    @IsOptional()
    @IsUrl()
    github?: string;

    @IsOptional()
    @IsUrl()
    twitter?: string;

    @IsOptional()
    @IsString()
    location?: string;
}
