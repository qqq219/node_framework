import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from "@nestjs/common";
import TypeORMDefault from './config/typeOrm/typeORMConfig';
import { TypeOrmOperateEventListener } from "./config/typeOrm/TypeOrmOperateEventListener";
@Module({
  imports: [
    TypeORMDefault
  ],
  controllers: [],
  providers: [
    TypeOrmOperateEventListener,
  ],
  exports:[TypeORMDefault]
})
export class FrameworkModule {

}
