import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // 🌟 QUAN TRỌNG: Bơm PrismaModule vào đây
  providers: [ServicesService],
  controllers: [ServicesController]
})
export class ServicesModule {}
