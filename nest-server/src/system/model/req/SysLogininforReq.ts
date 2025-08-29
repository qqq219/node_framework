import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";
import { StatusEnum } from "./SysRoleReq";

export class SysLogininforReq extends PagingDto {

  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string;


  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string;


  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

