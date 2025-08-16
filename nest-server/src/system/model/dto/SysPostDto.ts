
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";
import { StatusEnum } from "./SysMenuDto";

export class SysPostDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  postId: number;

  @IsString()
  @Length(0, 50)
  postName: string;

  @IsString()
  @Length(0, 64)
  postCode: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  postSort?: number;
}