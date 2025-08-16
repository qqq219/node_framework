import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import {ConfigModule} from '@nestjs/config';
import Configuration from './common/configure/configuration';
import { FrameworkModule } from 'framework/framework.module';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal:true,
      load: [Configuration]
    }), SystemModule, FrameworkModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
