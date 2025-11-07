import { BadRequestException, Body, Inject, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtpayload';
import { JwtService } from '@nestjs/jwt';
import id from 'zod/v4/locales/id.js';
import refreshConfig from './config/refresh.config';
import type { ConfigType } from "@nestjs/config";
import { error } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY) private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,

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

        const { accessToken, refreshToken } = await this.generateToken(userId);

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        await this.userService.updateHashRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            name,
            accessToken,
            refreshToken,
        }

    }

    async generateToken(userId: string) {

        const payload: AuthJwtPayload = { sub: userId };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])

        return { accessToken, refreshToken };

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

    async validateRefreshToken(userId: string, refreshToken: string) {

        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.hashRefreshToken!);

        if (!isRefreshTokenValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const currentUser = {
            id: user.id,
        };

        return currentUser;
    }

    async refreshToken(userId: string, name: string) {

        const { accessToken, refreshToken } = await this.generateToken(userId);

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        await this.userService.updateHashRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            name: name,
            accessToken,
            refreshToken,
        }

    }

    async validateGoogleUser(googleUser: CreateUserDto) {

        const user = await this.userService.findByEmail(googleUser.email);

        if (user) return user;

        return await this.userService.create(googleUser);

    }

    async signOut(userId: string) {
        return await this.userService.updateHashRefreshToken(userId, null);
    }

}

