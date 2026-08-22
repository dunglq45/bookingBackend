import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getAllServices() {
    return this.prisma.service.findMany({
      where: { isActive: true }
    });
  }

  async createService(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        durationMin: dto.durationMin,
      },
    });
  }

  // Hàm 3: Cập nhật thông tin dịch vụ (Tên, giá, mô tả...)
  async updateService(id: string, dto: any) {
    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  // Hàm 4: Xóa mềm dịch vụ (Chuyển trạng thái hoạt động thành false)
  async deleteService(id: string) {
    return this.prisma.service.update({
      where: { id },
      data: { isActive: false },
    });
  }

}
