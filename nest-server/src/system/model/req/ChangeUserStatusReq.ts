import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { StatusEnum } from "src/common/model/enum/StatusEnum";

export class ChangeUserStatusReq {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}

