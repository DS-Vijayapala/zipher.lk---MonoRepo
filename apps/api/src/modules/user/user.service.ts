import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/common/redis/redis.service';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) { }

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

    await this.prisma.point.create({
      data: {
        userId: newUser.id,
        points: 0,
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

    try {

      const cacheKey = `dashboardData:${userId}`;

      // Try to read from Redis cache first
      const cachedData = await this.redis.get(cacheKey);

      if (cachedData) {

        log("Send Dashboard data from cache:", cacheKey);
        return {
          success: true,
          data: cachedData
        };
      }

      // If no cache → fetch fresh data from DB
      const appliedJobCount = await this.countTotalApplications(userId);
      const PendingJobCount = await this.countApplicationsByStatus(userId, "Pending");
      const acceptedJobCount = await this.countApplicationsByStatus(userId, "Accepted");
      const userPoints = await this.getUserPoints(userId);


      const remainingPoints =
        (userPoints?.points ?? 0) + (userPoints?.default_point ?? 0) || 0;

      const responseData = {
        appliedJobCount,
        PendingJobCount,
        acceptedJobCount,
        remainingPoints,
      };

      // Save result to Redis (cache)
      await this.redis.set(cacheKey, responseData, 900);

      return {
        success: true,
        data: responseData,
      };

    } catch (error) {
      console.error("Dashboard error:", error);
      throw new InternalServerErrorException("Cannot fetch dashboard data");
    }
  }

  // Count all applications for user
  async countTotalApplications(userId: string) {
    return this.prisma.jobApplication.count({
      where: { userId },
    });
  }

  // Count applications by status
  async countApplicationsByStatus(
    userId: string,
    status: "Pending" | "Accepted" | "Rejected"
  ) {
    return this.prisma.jobApplication.count({
      where: { userId, status },
    });
  }

  // Get user points
  async getUserPoints(userId: string) {
    return this.prisma.point.findUnique({
      where: { userId },
      select: { points: true, default_point: true }
    });
  }

}


