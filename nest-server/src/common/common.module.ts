import { Module, ValidationPipe } from '@nestjs/common';
import { RedisUtil } from './utils/Redis.tool';
import { TokenUtil } from './utils/TokenUtils';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LogInterceptor } from './interceptor/LogInterceptor';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [
    SystemModule
  ],
  controllers: [],
  providers: [
    RedisUtil,TokenUtil,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LogInterceptor
    },
  ],
  exports: [RedisUtil,TokenUtil]
})
export class CommonModule {}