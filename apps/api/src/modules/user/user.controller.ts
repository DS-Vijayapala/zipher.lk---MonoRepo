import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/modules/auth/decoraters/roles.decoraters';

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

}
