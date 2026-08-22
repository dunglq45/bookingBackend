import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Tiền tố: http://localhost:3000/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login') // Kết hợp thành API: POST /auth/login
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}
