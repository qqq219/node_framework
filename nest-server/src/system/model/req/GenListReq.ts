
import { IsOptional, IsString } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";


export class GenListReq extends PagingDto {
  @IsString()
  @IsOptional()
  tableName?: string;
  @IsOptional()
  @IsString()
  tableComment?: string;
}