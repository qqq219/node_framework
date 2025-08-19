
import { IsNumberString, IsOptional, IsString, Length } from "class-validator";
import { PagingDto } from "src/common/model/dto/PagingDto";

export class AllocatedReq extends PagingDto {

  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;

  @IsOptional()
  @IsString()
  phonenumber?: string;

  @IsOptional()
  @IsNumberString()
  roleId?: string;
}