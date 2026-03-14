import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/modules/auth/decoraters/roles.decoraters';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Create User
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Get Dashboard Data
  @Roles('USER')
  @Get('/dashboard-data')
  getDashboardData(
    @Req() req: any,
  ) {

    const userId = req.user.id;

    return this.userService.getDashboardData(userId);
  }

  // Resume Upload
  @Roles('USER')
  @Post('/resume/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.id;

    if (!file) {
      throw new BadRequestException('Resume file is required');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    return this.userService.uploadUserResume(userId, file);
  }

  //  Get My Profile
  @Roles('USER')
  @Get('/profile/me')
  getMyProfile(@Req() req: any) {
    return this.userService.getMyProfile(req.user.id);
  }


  // Create or Update Profile
  @Roles('USER')
  @Patch('/profile')
  updateProfile(
    @Req() req: any,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.upsertProfile(
      req.user.id,
      dto,
    );
  }


}
