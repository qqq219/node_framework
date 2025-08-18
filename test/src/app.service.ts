import { Injectable } from '@nestjs/common';
import { SysConfigService } from './test/system.service';


@Injectable()
export class AppService {
  constructor(
  ){

  }
  async getHello(){
    return 'Hello World!';
  }
}
