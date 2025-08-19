
import { IsNumber, IsString, Length } from "class-validator";
import { Type } from "class-transformer";


export class ResetUserPwdReq {

  @IsNumber()
  @Type(()=>Number)
  userId: number;

  @IsString()
  @Length(5, 20)
  password: string;

}