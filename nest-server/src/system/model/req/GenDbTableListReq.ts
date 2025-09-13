import { IsOptional, IsString } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";


export class GenDbTableListReq extends PagingDto {
  @IsString()
  @IsOptional()
  tableName?: string;

  @IsString()
  @IsOptional()
  tableComment?: string;
}