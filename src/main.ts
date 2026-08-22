import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌟 KHÓA CHỐT: Cấu hình CORS cho phép Angular (Local & Production) truy cập API
  app.enableCors({
    origin: [
      'http://localhost:4200', // Cho phép Angular dev dưới local
      'http://localhost:3000',
      // Thay đường dẫn bên dưới bằng Domain Web Angular của bạn sau khi deploy (Vercel/Netlify/Custom Domain)
      // 'https://ten-mien-web-angular-cua-ban.vercel.app', 
      'https://booking-frontend-two-pearl.vercel.app' // Domain Vercel thật của bạn
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // 🌟 CẤU HÌNH SWAGGER UI
  const config = new DocumentBuilder()
    .setTitle('Booking API Docs')
    .setDescription('Danh sách REST API cho ứng dụng Booking')
    .setVersion('1.0')
    .addBearerAuth() // Đăng ký xác thực Bearer Token (JWT) nếu dự án có dùng Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Đường dẫn truy cập UI: /api/docs

  // Sử dụng process.env.PORT do Render cấp, fallback về 3000 khi dev local
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();