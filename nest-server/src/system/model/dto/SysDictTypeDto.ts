import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";
import { StatusEnum } from "src/common/model/enum/StatusEnum";

export class SysDictTypeDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  dictId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(0, 100)
  dictName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(0, 100)
  dictType: string;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}