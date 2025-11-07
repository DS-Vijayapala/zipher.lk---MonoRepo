import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async getAll(@Request() req) {
    return "Now you are accessing protected route " + req.user.id;
  }


  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }


  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {

    const response = await this.authService.login(req.user.id, req.user.name);

    res.redirect(`http://localhost:3000/api/auth/google/callback?userId=${response.id}
      &name=${response.name}
      &accessToken=${response.accessToken}
      &refreshToken=${response.refreshToken}`);
  }

}
