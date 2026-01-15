import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/modules/auth/decoraters/roles.decoraters';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

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


}
