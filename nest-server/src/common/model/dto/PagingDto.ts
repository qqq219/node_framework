import { IsDateString, IsNumberString, IsObject, IsOptional, IsString } from 'class-validator';
import {  Type } from "class-transformer";
import { DateParamsDTO } from './DateParamsDTO';
/**
 * 分页DTO
 */
export class PagingDto {
  @IsOptional()
  @Type(() => Number)
  current: number;

  @IsOptional()
  @Type(() => Number)
  pageSize: number;

  /**
   * 时间区间
   */
  @IsOptional()
  @IsObject()
  params?: DateParamsDTO;

  /**
   * 排序字段
   */
  @IsOptional()
  @IsString()
  orderByColumn?: string;

  /**
   * 排序规则
   */
  @IsOptional()
  @IsString()
  isAsc?: 'ascending' | 'descending';
}
