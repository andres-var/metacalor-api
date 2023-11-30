import {
  Controller,
  Post,
  Body,
  HttpCode,
  Param,
  Res,
  Get,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login Success', type: User })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify/:id')
  @HttpCode(200)
  async verify(@Param('id') id: string, @Res() res: Response) {
    await this.authService.verify(id);

    return res.status(302).redirect(`http://localhost:8080/confirmation.html`);
  }
}
