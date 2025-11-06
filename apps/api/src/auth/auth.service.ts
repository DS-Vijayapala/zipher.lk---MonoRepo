import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,

    ) { }

    async registerUser(createUserDto: CreateUserDto) {
        const user = await this.userService.findByEmail(createUserDto.email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        return this.userService.create(createUserDto);
    }

    async validateLocalUser(email: string, password: string): Promise<any> {

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (!user.password) throw new BadRequestException('Password not set for user');

        const isPasswordValid = await bcrypt.compare(password, user.password!);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password!');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };

    }

}
