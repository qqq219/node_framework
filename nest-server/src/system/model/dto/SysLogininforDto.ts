
import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from "class-transformer";
import { ConvertDate } from "src/common/model/ConvertDate";

export class SysLogininforDto {
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    infoId?: number;
            
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    userName?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    ipaddr?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    loginLocation?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    browser?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    os?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    msg?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    loginTime?: ConvertDate;
    
}
    