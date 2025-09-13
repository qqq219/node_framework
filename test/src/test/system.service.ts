import { Injectable } from "@nestjs/common";
import { Redis } from 'ioredis';
import { InjectRedis } from "@nestjs-modules/ioredis";

@Injectable()
export class SysConfigService {

    constructor(
        @InjectRedis() private readonly redis: Redis
    ){}
    
}