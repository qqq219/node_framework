import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SysConfigService } from '../service/SysConfig.service';
import { SysConfigReq } from '../model/req/SysConfigReq';
import { SysConfigDto } from '../model/dto/SysConfigDto';

@Controller('system/config')
export class SysConfigController {
  constructor(
    private readonly sysConfigService:SysConfigService
  ) {}

  @Get('/list')
  findAll(@Query() query: SysConfigReq) {
    return this.sysConfigService.queryList(query);
  }

  @Post()
  create(@Body() createConfigDto: SysConfigDto) {
    return this.sysConfigService.create(createConfigDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysConfigService.findOne(+id);
  }

  @Put()
  update(@Body() updateConfigDto: SysConfigDto) {
    return this.sysConfigService.update(updateConfigDto);
  }

  @Delete('/refreshCache')
  refreshCache() {
    return this.sysConfigService.resetConfigCache();
  }

  @Delete(':id')
  remove(@Param('id') ids: string) {
    const configIds = ids.split(',').map((id) => +id);
    return this.sysConfigService.remove(configIds);
  }
}
