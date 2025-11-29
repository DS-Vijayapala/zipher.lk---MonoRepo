import { Body, Controller, Get, Post, Req, Request, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { Response } from 'express';
import { Public } from './decoraters/public.decoraters';
import { Roles } from './decoraters/roles.decoraters';
import { RolesGuard } from './guards/roles/roles.guard';
import { SendEmailService } from 'src/common/send-email/send-email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailer: SendEmailService
  ) { }

  @Public()
  @Post('signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name, req.user.role, req.user.email);
  }

  @Roles("ADMIN")
  @Get('protected')
  async getAll(@Request() req) {
    return "Now you are accessing protected route " + req.user.id;
  }


  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() { }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {

    const response = await this.authService.login(req.user.id, req.user.name, req.user.role, req.user.email);

    res.redirect(`http://localhost:3000/api/auth/google/callback?userId=${response.id}
      &email=${response.email}
      &name=${response.name}
      &accessToken=${response.accessToken}
      &refreshToken=${response.refreshToken}
      &role=${req.user.role}`);
  }

  @Post('signout')
  async signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }

  @Public()
  @Post('send-otp')
  async sendOtpEndpoint(@Body() body: { email: string }) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    await this.mailer.sendOtpEmail(
      body.email,
      '',                   // senderEmail override (optional)
      'Zipher Team',        // senderName
      otp,
      'otp-email.ejs',
      10,                   // expire in 10 minutes
    );
    return { ok: true, otpSent: true }; // don't return OTP in production; for dev only
  }


}
