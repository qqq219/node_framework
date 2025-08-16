import { IsOptional, IsString } from "class-validator";


export class SysDeptReq {
  @IsOptional()
  @IsString()
  deptName?: string;

  @IsOptional()
  @IsString()
  status?: string;
}