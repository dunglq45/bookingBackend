import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // QUAN TRỌNG: Dòng này cho phép các Module khác mượn PrismaService để dùng
})
export class PrismaModule {}
