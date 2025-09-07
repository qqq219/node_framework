
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class SysMenuReq {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  menuName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
  
}