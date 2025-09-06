import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SysConfigService } from '../service/SysConfig.service';
import { SysConfigReq } from '../model/req/SysConfigReq';
import { SysConfigDto } from '../model/dto/SysConfigDto';
import { RequirePermission } from 'src/auth/decorator/RequirePremission.decorator';

@Controller('system/config')
export class SysConfigController {
  constructor(
    private readonly sysConfigService:SysConfigService
  ) {}

  @RequirePermission("system:config:list")
  @Get('/list')
  findAll(@Query() query: SysConfigReq) {
    return this.sysConfigService.queryList(query);
  }

  @RequirePermission("system:config:add")
  @Post()
  create(@Body() createConfigDto: SysConfigDto) {
    return this.sysConfigService.create(createConfigDto);
  }

  @RequirePermission("system:config:query")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysConfigService.findOne(+id);
  }

  @RequirePermission("system:config:edit")
  @Put()
  update(@Body() updateConfigDto: SysConfigDto) {
    return this.sysConfigService.update(updateConfigDto);
  }

  @Delete('/refreshCache')
  refreshCache() {
    return this.sysConfigService.resetConfigCache();
  }
  
  @RequirePermission("system:config:remove")
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const configIds = ids.split(',').map((id) => +id);
    return this.sysConfigService.remove(configIds);
  }
}
