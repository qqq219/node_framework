import { Controller, Get } from '@nestjs/common';
import { SysConfigService } from './system.service';

@Controller("/system")
export class SystemController {
  constructor(private readonly sysService: SysConfigService) {}

  @Get()
  getHello() {
    return this.sysService.hello();
  }
}
