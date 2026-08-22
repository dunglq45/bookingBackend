import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  // Hàm tạo lịch hẹn mới cho một khách hàng cụ thể
  async createAppointment(userId: string, dto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        dateTime: new Date(dto.dateTime), // Chuyển chuỗi chữ từ client thành kiểu Ngày Giờ thực tế
        notes: dto.notes,
        customerId: userId,               // Gắn ID khách hàng lấy từ mã bảo mật Token
        serviceId: dto.serviceId,         // Gắn ID dịch vụ
      },
      // Kỹ thuật Include: Tự động móc nối lấy thêm cả thông tin chi tiết dịch vụ trả về cho Client xem
      include: {
        service: true
      }
    });
  }

   // 🌟 THÊM HÀM MỚI NÀY: Lấy toàn bộ lịch hẹn của cả hệ thống đổ ra Dashboard cho Admin
  async getAllAppointments() {
    return this.prisma.appointment.findMany({
      include: {
        service: true // Móc nối thông tin lấy kèm cả Tên dịch vụ và Giá tiền
      },
      orderBy: {
        createdAt: 'desc' // Lịch hẹn mới đặt sẽ được đẩy lên trên cùng đầu bảng
      }
    });
  }

  // Thêm hàm cập nhật trạng thái lịch hẹn vào Database
  async updateStatus(appointmentId: string, newStatus: any) {
    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus },
      include: { service: true } // Móc nối thông tin lấy kèm dịch vụ trả về sau khi sửa
    });
  }

}
