
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";


export class AuthUserCancelReq {

  @IsNumber()
  @Type(()=>Number)
  roleId: number;

  @IsNumber()
  @Type(()=>Number)
  userId: number;
}
