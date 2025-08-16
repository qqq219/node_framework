import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 导入 ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // 全局启用ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

