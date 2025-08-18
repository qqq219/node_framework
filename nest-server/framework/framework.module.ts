import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from "@nestjs/common";
import TypeORMDefault from './config/typeOrm/typeORMConfig';
import RedisConfigDefault from './config/redisConfig'
import { TypeOrmOperateEventListener } from "./config/typeOrm/TypeOrmOperateEventListener";
@Module({
  imports: [
    TypeORMDefault,RedisConfigDefault
  ],
  controllers: [],
  providers: [
    TypeOrmOperateEventListener,
  ],
  exports:[TypeORMDefault, RedisConfigDefault]
})
export class FrameworkModule {

}
