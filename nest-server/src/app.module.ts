import { DynamicModule, Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import Configuration from './common/configure/configuration';
import { FrameworkModule } from 'framework/framework.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      isGlobal:true,
      load: [Configuration]
    }), 
    FrameworkModule, CommonModule, AuthModule, SystemModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
