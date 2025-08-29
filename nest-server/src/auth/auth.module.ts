import {  Module } from '@nestjs/common';
import { TokenController } from './controller/TokenController';
import { SysLoginService } from './service/service/SysLoginService';
import { SystemModule } from 'src/system/system.module';
import { CommonModule } from 'src/common/common.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SystemModule, CommonModule],
  controllers: [TokenController],
  providers: [SysLoginService],
  exports:[SysLoginService]
})

export class AuthModule {}
