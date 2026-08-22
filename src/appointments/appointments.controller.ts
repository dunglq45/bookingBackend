import { Controller, Post, Body, UseGuards, Request, Get, Patch, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './create-appointment.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('appointments') // Đường dẫn: http://localhost:3000/appointments
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard) // 🌟 BẮT BUỘC ĐĂNG NHẬP: Chỉ ai có Token mới được đặt lịch
  @Post()
  async create(@Body() dto: CreateAppointmentDto, @Request() req: any) {
    // req.user được lấy từ AuthGuard sau khi giải mã Token thành công
    const userId = req.user.sub; 
    return this.appointmentsService.createAppointment(userId, dto);
  }
  // 🌟 THÊM CỔNG API NÀY: Tiếp nhận request GET /appointments từ Angular gửi sang
  @Get()
  async findAll() {
    return this.appointmentsService.getAllAppointments();
  }

  // 🌟 THÊM API CẬP NHẬT TRẠNG THÁI NÀY VÀO
  @Patch(':id/status') // Đường dẫn dạng: PATCH /appointments/MÃ_ID/status
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appointmentsService.updateStatus(id, status);
  }
}
