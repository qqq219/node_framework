import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export enum TypeEnum {
  YES = 'Y',
  NO = 'N',
}

export class SysConfigDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  configId?: number;

  @IsString()
  @Length(0, 100)
  configName: string;

  @IsString()
  @Length(0, 500)
  configValue: string;

  @IsString()
  @Length(0, 100)
  configKey: string;

  @IsString()
  @IsEnum(TypeEnum)
  configType: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

}