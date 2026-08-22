import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth') // Tiền tố: http://localhost:3000/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login') // Kết hợp thành API: POST /auth/login
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin2026@gmail.com' },
        password: { type: 'string', example: '123' },
      },
      required: ['email', 'password'],
    },
  })
  // async login(@Body() body: any) {
  //   return this.authService.login(body.email, body.password);
  // }
  async login(@Body() body: any) {
    // Lưu ý: Kiểm tra key gửi từ Frontend/Swagger truyền đúng vào tham số
    // Lấy password từ body.password hoặc body.pass để không bao giờ bị undefined
    const passwordInput = body.password || body.pass;
    return this.authService.login(body.email, passwordInput);
    // return this.authService.login(body.email, body.pass || body['password']);
  }
}
