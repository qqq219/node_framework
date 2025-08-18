import { Injectable } from "@nestjs/common";
import { Redis } from 'ioredis';
import { InjectRedis } from "@nestjs-modules/ioredis";

@Injectable()
export class SysConfigService {

    constructor(
        @InjectRedis() private readonly redis: Redis
    ){}
    
    async hello(){
        this.redis.set("jinjian", "3333");
        const value = await this.redis.get("jinjian");
        console.log("jinjian====>" + value)
        return "jinjian";
    }
    
}