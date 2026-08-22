export class CreateAppointmentDto {
  dateTime!: string;   // Chuỗi ngày giờ dạng ISO (Ví dụ: "2026-09-01T10:00:00.000Z")
  serviceId!: string;  // Mã ID UUID của dịch vụ khách chọn
  notes?: string;
}
