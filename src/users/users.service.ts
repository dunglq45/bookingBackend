import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Kỹ thuật Dependency Injection quen thuộc từ Angular: Bơm Prisma vào đây để xài
  constructor(private prisma: PrismaService) { }

  // Hàm xử lý lấy toàn bộ danh sách User trong Database
  async getAllUsers() {
    return (this.prisma as any).user.findMany();
  }
  // Hàm 2: Thêm mới hàm tạo User
  async createUser(dto: CreateUserDto) {
    // 2. Tiến hành băm mật khẩu với độ phức tạp là 10 (mất khoảng 0.1 giây để tăng độ bảo mật)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    return (this.prisma as any).user.create({
      data: {
        email: dto.email,
        password: hashedPassword, // 3. Lưu mật khẩu ĐÃ MÃ HÓA vào database
        fullName: dto.fullName,
      },
    });
  }

  // Hàm bổ sung: Tìm người dùng bằng Email phục vụ cho bước Đăng nhập sau này
  async findByEmail(email: string) {
    return (this.prisma as any).user.findUnique({
      where: { email },
    });
  }
}
