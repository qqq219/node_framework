import { Module } from '@nestjs/common';
import { RedisUtil } from './utils/Redis.tool';
import { TokenUtil } from './utils/TokenUtils';

@Module({
  imports: [
  ],
  controllers: [],
  providers: [
    RedisUtil,TokenUtil
  ],
  exports: [RedisUtil,TokenUtil]
})
export class CommonModule {}