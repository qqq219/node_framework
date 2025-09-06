
import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";


export class UpdateProfileReq {

  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @IsOptional()
  @IsString()
  phonenumber: string;

  @IsOptional()
  @IsString()
  sex: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}