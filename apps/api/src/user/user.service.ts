import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import bycript from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {

    const { password, ...user } = createUserDto

    if (!password) throw new Error('Password is required');

    const hashedPassword = bycript.hashSync(password, 10);

    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }


}
