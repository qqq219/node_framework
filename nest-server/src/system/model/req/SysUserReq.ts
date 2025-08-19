

import { IsEnum, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";
import { StatusEnum } from "src/common/model/enum/StatusEnum";


export class SysUserReq extends PagingDto {

  @IsOptional()
  @IsNumberString()
  deptId?: string;


  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName?: string;


  @IsOptional()
  @IsString()
  @Length(0, 30)
  email?: string;


  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;


  @IsOptional()
  @IsString()
  phonenumber?: string;


  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}