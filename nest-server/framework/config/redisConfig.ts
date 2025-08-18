
import { RedisModule, RedisModuleOptions } from "@nestjs-modules/ioredis"
import { ConfigService } from "@nestjs/config"

export default RedisModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const config = configService.get<RedisModuleOptions>('redis');
        if (!config) {
            throw new Error("Redis configuration not found");
        }
        return config;
    }
});
