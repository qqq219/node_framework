import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SysLogininforService } from "../service/SysLogininfor.service";
import { SysLogininforReq } from "../model/req/SysLogininforReq";
import { RequirePermission } from 'src/auth/decorator/RequirePremission.decorator';

@ApiTags('登录日志')
@Controller('system/logininfor')
export class SysLogininforController {
  constructor(
    private readonly sysLogininforService:SysLogininforService
  ) {}

  @ApiOperation({
    summary: '登录日志-列表',
  })
  @ApiBody({
    type: SysLogininforReq,
    required: true,
  })
  @RequirePermission("system:logininfor:list")
  @Get('/list')
  findAll(@Query() query: SysLogininforReq) {
    return this.sysLogininforService.findAll(query);
  }

}
