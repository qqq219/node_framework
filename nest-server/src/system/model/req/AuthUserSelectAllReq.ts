
import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";


export class AuthUserSelectAllDto {

  @IsNumber()
  @Type(()=>Number)
  roleId: number;
  
  @IsString()
  userIds: string;
}
