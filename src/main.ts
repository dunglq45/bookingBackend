import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🌟 KHÓA CHỐT: Cho phép tất cả các ứng dụng Frontend (Angular, Web, Mobile) gọi API thoải mái
  app.enableCors({
    origin: '*', // Trong môi trường sản xuất thật, bạn sẽ thay bằng domain của web (Ví dụ: https://myadmin.com)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
