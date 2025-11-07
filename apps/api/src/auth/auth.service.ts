import { BadRequestException, Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtpayload';
import { JwtService } from '@nestjs/jwt';
import id from 'zod/v4/locales/id.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,

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

    async login(userId: string, name: string) {

        const { accessToken } = await this.generateToken(userId);

        return {
            id: userId,
            name,
            accessToken,
        }

    }

    async generateToken(userId: string) {

        const payload: AuthJwtPayload = { sub: userId };

        const [accessToken] = await Promise.all([this.jwtService.signAsync(payload)])

        return { accessToken };

    }

    async validateJWTPayload(userId: string) {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return currentUser;

    }

}

