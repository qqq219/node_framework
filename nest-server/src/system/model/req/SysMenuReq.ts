
import { IsEnum, IsOptional, IsString } from "class-validator";


export class SysMenuReq {

  @IsOptional()
  @IsString()
  menuName?: string;

  @IsOptional()
  @IsString()
  status?: string;
  
}