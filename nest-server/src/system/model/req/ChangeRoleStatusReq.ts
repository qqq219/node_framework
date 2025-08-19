
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";


export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class ChangeRoleStatusReq {

  @IsNumber()
  @Type(()=>Number)
  roleId: number;

  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}
