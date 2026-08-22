import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './create-service.dto';

@Controller('services') // Đường dẫn: http://localhost:3000/services
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get() // Cổng lấy dữ liệu công khai
  async findAll() {
    return this.servicesService.getAllServices();
  }

  @Post() // Cổng tạo mới dữ liệu
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(createServiceDto);
  }

  // 🌟 THÊM API CẬP NHẬT THÔNG TIN DỊCH VỤ
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.servicesService.updateService(id, dto);
  }

  // 🌟 THÊM API XÓA MỀM DỊCH VỤ
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
