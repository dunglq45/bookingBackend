import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    console.log('--- DEBUG LOGIN ---');
    console.log('Email nhan duoc:', email);
    console.log('Pass nhan duoc:', pass);
    // 1. Kiểm tra xem người dùng có tồn tại trong hệ thống không
    const user = await this.usersService.findByEmail(email);
    console.log('User tim thay trong DB:', user);
    if (!user) {
      console.log('==> KHONG TIM THAY USER');
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác!');
    }

    // 2. So sánh mật khẩu thô gửi lên với mật khẩu đã băm trong database
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      console.log('==> MAT KHAU KHONG MATCH');
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác!');
    }

    // 3. Nếu mọi thứ đúng, tiến hành đóng gói thông tin tạo JWT Token trả về
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
