import { Body, Controller, Get, Post, Delete, Put, Query, Param, Request } from '@nestjs/common';
import { SysMenuService } from '../service/SysMenu.service';
import { SysMenuReq } from '../model/req/SysMenuReq';
import { SysMenuDto } from '../model/dto/SysMenuDto';
import { ResultData } from 'src/common/model/ResultData';
import { RequirePermission } from 'src/auth/decorator/RequirePremission.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'src/common/interceptor/Log';
import { BusinessType } from 'src/common/model/enum/BusinessType';

@ApiTags('菜单管理')
@Controller('system/menu')
export class SysMenuController {
  constructor(
    private readonly sysMenuService: SysMenuService,
  ) {}

  @ApiOperation({
    summary: '获取路由',
  })
  @Get("/getRouters")
  async getRouters(@Request() req): Promise<any> {
    const menus = await this.sysMenuService.selectMenuTreeByUserId(req.user)
    return ResultData.ok(menus);
  }

  @ApiOperation({
    summary: '菜单管理-列表',
  })
  @RequirePermission("system:menu:list")
  @Get('/list')
  findAll(@Query() query: SysMenuReq) {
    return this.sysMenuService.findAll(query);
  }
  
  @ApiOperation({
    summary: '菜单管理-创建',
  })
  @ApiBody({
    type: SysMenuDto,
    required: true,
  })
  @Log({title:"菜单管理-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:menu:add")
  @Post()
  create(@Body() createMenuDto: SysMenuDto) {
    return this.sysMenuService.create(createMenuDto);
  }

  @ApiOperation({
    summary: '菜单管理-修改',
  })
  @ApiBody({
    type: SysMenuDto,
    required: true,
  })
  @Log({title:"菜单管理-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:menu:edit")
  @Put()
  update(@Body() updateMenuDto: SysMenuDto) {
    return this.sysMenuService.update(updateMenuDto);
  }

  @ApiOperation({
    summary: '菜单管理-删除',
  })
  @Log({title:"菜单管理-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:menu:remove")
  @Delete(':menuId')
  remove(@Param('menuId') ids: string) {
    const idList = ids.split(',').map((id) => +id);
    return this.sysMenuService.remove(idList);
  }

  @ApiOperation({
    summary: '菜单管理-树表',
  })
  @Get('/treeselect')
  treeSelect() {
    return this.sysMenuService.treeSelect();
  }

  @ApiOperation({
    summary: '菜单管理-角色-树表',
  })
  @Get('/roleMenuTreeselect/:menuId')
  roleMenuTreeselect(@Param('menuId') menuId: string) {
    return this.sysMenuService.roleMenuTreeselect(+menuId);
  }


}
