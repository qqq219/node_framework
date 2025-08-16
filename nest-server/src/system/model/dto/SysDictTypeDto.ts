
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";
import { StatusEnum } from "src/common/model/enum/StatusEnum";

export class SysDictTypeDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  dictId: number;

  @IsString()
  @Length(0, 100)
  dictName: string;

  @IsString()
  @Length(0, 100)
  dictType: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}