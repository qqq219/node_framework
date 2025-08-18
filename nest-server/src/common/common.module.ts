import { Module } from '@nestjs/common';
import { RedisUtil } from './utils/Redis.tool';

@Module({
  imports: [

  ],
  controllers: [],
  providers: [
    RedisUtil
  ],
  exports: [RedisUtil]
})
export class CommonModule {}