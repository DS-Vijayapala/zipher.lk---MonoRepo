import { IsEmail, IsString } from 'class-validator';


export class CreateUserDto {

    @IsString()
    name: string | null;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string | null;
}
