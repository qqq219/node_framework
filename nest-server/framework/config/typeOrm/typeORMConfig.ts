import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { ConfigModule, ConfigService } from '@nestjs/config';

const entitiesPaths = [join(__dirname,'..','..','..','**','*.entity.{ts,js}')]
console.log("entitiesPaths: ",entitiesPaths);
export default TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => (   
    {    
      ...configService.get("typeOrm"),
      entities: entitiesPaths
    } 
  ),
});