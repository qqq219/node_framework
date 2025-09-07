import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";
import { StatusEnum } from "./SysRoleReq";

export class SysOperlogReq extends PagingDto {

  @IsOptional()
  @IsString()
  operId?: string;


  @IsOptional()
  @IsString()
  @Length(0, 50)
  title?: string;

  @IsOptional()
  businessType?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  requestMethod?: string;

  @IsOptional()
  @IsString()
  operatorType?: string;

  @IsOptional()
  @IsString()
  operName?: string;

  @IsOptional()
  @IsString()
  deptName?: string;

  @IsOptional()
  @IsString()
  operUrl?: string;

  @IsOptional()
  @IsString()
  operIp?: string;

  @IsOptional()
  @IsString()
  operLocation?: string;

  @IsOptional()
  @IsString()
  operParam?: string;

  @IsOptional()
  operTime?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

