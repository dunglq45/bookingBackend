import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // 1. Lấy token từ header của request gửi lên
    const token = this.extractTokenFromHeader(request);
    
    // 2. Nếu không có token, chặn lại ngay lập tức
    if (!token) {
      throw new UnauthorizedException('Bạn cần đăng nhập để truy cập tính năng này!');
    }
    
    try {
      // 3. Tiến hành giải mã mã Token xem có hợp lệ không
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env['JWT_SECRET'] || 'SECRET_MAC_DINH_123',
      });
      
      // 4. Gắn thông tin User đã giải mã vào đối tượng request để các tầng sau sử dụng
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Mã Token đã hết hạn hoặc không hợp lệ!');
    }
    return true;
  }

  // Hàm phụ bổ sung để bóc tách chuỗi Token từ cấu trúc Bearer Token của Header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
