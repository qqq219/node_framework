

import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class SysRoleReq extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 30)
  roleName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  roleKey?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  roleId?: string;
}