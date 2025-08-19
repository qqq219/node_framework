import { Body, Controller, Get, Post, Delete, Put, Query, Param, Request } from '@nestjs/common';
import { SysMenuService } from '../service/SysMenu.service';
import { SysMenuReq } from '../model/req/SysMenuReq';
import { SysMenuDto } from '../model/dto/SysMenuDto';
import { ResultData } from 'src/common/model/ResultData';

@Controller("system/menu")
export class SysMenuController {

  constructor(private readonly sysMenuService: SysMenuService) {

  }

  @Get("list")
  list(@Query() query: SysMenuReq) {
    return this.sysMenuService.findAll(query);
  }

  @Post("create")
  create(@Body() sysMenuDto : SysMenuDto) {
    this.sysMenuService.create(sysMenuDto);
    return ResultData.ok()
  }

  @Get("/getRouters")
  async getRouters(@Request() req): Promise<any> {
    const menus = await this.sysMenuService.selectMenuTreeByUserId(req.user)
    return ResultData.ok(menus);
  }

  @Put()
  update(@Body() updateMenuDto: SysMenuDto) {
    return this.sysMenuService.update(updateMenuDto);
  }

  @Delete(':menuId')
  remove(@Param('menuId') ids: string) {
    const idList = ids.split(',').map((id) => +id);
    return this.sysMenuService.remove(idList);
  }

  @Get('/treeselect')
  treeSelect() {
    return this.sysMenuService.treeSelect();
  }
  
  @Get('/roleMenuTreeselect/:menuId')
  roleMenuTreeselect(@Param('menuId') menuId: string) {
    return this.sysMenuService.roleMenuTreeselect(+menuId);
  }

}
