
import { IsEnum, IsNumber, IsOptional, IsString, IsNotEmpty, Length, isNotEmpty } from "class-validator";
import { Type } from "class-transformer";


//菜单类型
export enum MenuTypeEnum {
  M = 'M',
  C = 'C',
  F = 'F',
}
export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class SysMenuDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  menuId?: number;

  @IsString()
  @Length(0, 50)
  menuName?: string;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  orderNum?: number;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  parentId?: number;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  path?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  query?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  component?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  icon?: string;

  @IsOptional()
  @IsString()
  @IsEnum(MenuTypeEnum)
  menuType?: string;

  @IsOptional()
  isCache?: number;

  @IsOptional()
  isFrame?: number;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  visible?: string;

  @IsOptional()
  @IsString()
  perms?: string;

}
