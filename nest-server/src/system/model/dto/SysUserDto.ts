
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class SysUserDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  userId: number;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  deptId?: number;

  @IsOptional()
  @Length(0, 50)
  email: string;

  @IsString()
  @Length(0, 30)
  nickName: string;

  @IsString()
  @Length(0, 30)
  userName: string;

  @IsString()
  @Length(0, 200)
  password: string;

  @IsOptional()
  @IsString()
    // @IsPhoneNumber('CN')
  phonenumber?: string;

  @IsOptional()
  @IsArray()
  postIds?: Array<number>;

  @IsOptional()
  @IsArray()
  roleIds?: Array<number>;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  postSort?: number;
}
