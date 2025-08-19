
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { StatusEnum } from "src/common/model/enum/StatusEnum";

export class ChangeUserStatusReq {

  @IsNumber()
  @Type(()=>Number)
  userId: number;

  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}

