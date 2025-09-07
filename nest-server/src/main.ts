import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 导入 ValidationPipe
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Next Nest Ruoyi API')
    .setDescription('API of Ruoyi Framework By Next and Nest')
    .setVersion('1.0')
    .addTag('Next Nest Ruoyi API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

   // 全局启用ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

