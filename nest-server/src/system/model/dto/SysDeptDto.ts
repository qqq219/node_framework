
import { IsEmail, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { Type } from "class-transformer";


export class SysDeptDto {


  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  deptId?: number;


  @IsNumber()
  @Type(()=>Number)
  parentId: number;


  @IsString()
  @Length(0, 30)
  deptName: string;


  @IsNumber()
  @Min(0)
  @Type(()=>Number)
  orderNum: number;


  @IsOptional()
  @IsString()
  leader?: string;


  @IsOptional()
  @IsString()
  @Length(0, 11)
  phone?: string;


  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;


  @IsOptional()
  @IsString()
  status?: string;
}