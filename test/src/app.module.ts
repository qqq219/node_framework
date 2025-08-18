import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './test/system.module';

@Module({
  imports: [
    SystemModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[]
})
export class AppModule {}
