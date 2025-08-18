import { Module } from '@nestjs/common';
import { SysConfigService } from './system.service';
import { SystemController } from './system.controller';
import RedisDefault from "./redisConfig"

@Module({
 imports: [
    RedisDefault
  ],
  controllers:[SystemController],
  providers: [SysConfigService],
  exports: []
})
export class SystemModule {}