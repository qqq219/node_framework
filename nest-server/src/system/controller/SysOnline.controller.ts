import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SysOnlineService } from '../service/SysOnline.service';
import { RequirePermission } from 'src/auth/decorator/RequirePremission.decorator';
import { BusinessType } from 'src/common/model/enum/BusinessType';
import { Log } from 'src/common/interceptor/Log';

@ApiTags('系统监控-在线用户')
@Controller('system/online')
export class SysOnlineController {
  constructor(private readonly onlineService: SysOnlineService) {}

  @ApiOperation({
    summary: '在线用户-列表',
  })
  @RequirePermission('monitor:online:list')
  @Get('/list')
  findAll(@Query() query) {
    return this.onlineService.findAll(query);
  }

  @ApiOperation({
    summary: '在线用户-强退',
  })
  @Log({title:"在线用户-FORCED_OUT",businessType:BusinessType.FORCED_OUT})
  @RequirePermission('monitor:online:forceLogout')
  @Delete('/:token')
  delete(@Param('token') token: string) {
    return this.onlineService.delete(token);
  }
}
