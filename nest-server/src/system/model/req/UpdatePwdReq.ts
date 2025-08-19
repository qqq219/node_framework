
import { IsString, Length } from "class-validator";


export class UpdatePwdReq {

  @IsString()
  @Length(0, 200)
  oldPassword: string;

  @IsString()
  @Length(0, 200)
  newPassword: string;
}