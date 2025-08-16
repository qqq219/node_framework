import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";
import { StatusEnum } from "../dto/SysMenuDto";

export class ListDictData extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictLabel?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictType?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}