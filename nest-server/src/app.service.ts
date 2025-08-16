import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService:ConfigService){}
  getHello(): string {
    const typeOrmStr = this.configService.get("typeOrm");
    console.log(typeOrmStr);
    return 'Hello World!';
  }
}
