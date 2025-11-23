import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password!, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return newUser;

  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async updateHashRefreshToken(userId: string, hashRT: string | null) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { hashRefreshToken: hashRT },
    });
  }

  async getDashboardData(userId: string) {

    return { message: `Dashboard data for user with ID: ${userId}` };
  }
}