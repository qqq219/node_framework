
import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from "class-transformer";
import { ConvertDate } from "src/common/model/ConvertDate";

export class SysNoticeDto {
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    noticeId: number;
            
    @ApiProperty({ required: true })
    @IsString()
    noticeTitle: string;
    
    @ApiProperty({ required: true })
    @IsString()
    noticeType: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    noticeContent?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    remark?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    createBy?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    createTime?: ConvertDate;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    updateBy?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    updateTime?: ConvertDate;
    
}
    