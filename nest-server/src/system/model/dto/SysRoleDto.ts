
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class SysRoleDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  roleId: number;

  @IsString()
  @Length(0, 30)
  roleName: string;

  @IsString()
  @Length(0, 100)
  roleKey: string;

  @IsOptional()
  @IsArray()
  menuIds?: Array<number>;

  @IsOptional()
  @IsArray()
  deptIds?: Array<number>;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  roleSort?: number;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  dataScope: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsBoolean()
  menuCheckStrictly?: boolean;

  @IsOptional()
  @IsBoolean()
  deptCheckStrictly?: boolean;
}
