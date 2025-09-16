
import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from "class-transformer";
import { ConvertDate } from "src/common/model/ConvertDate";

export class SysOperLogDto {
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    operId: number;
            
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    businessType?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    method?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    requestMethod?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    operatorType?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    operName?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    deptName?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    operUrl?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    operIp?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    operLocation?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    operParam?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    jsonResult?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    errorMsg?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    operTime?: ConvertDate;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    costTime?: number;
    
}
    