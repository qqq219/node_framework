import { Body, Controller, Get, Post } from '@nestjs/common';
import { SysMenuService } from '../service/SysMenu.service';
import { SysMenuReq } from '../model/req/SysMenuReq';
import { SysMenuDto } from '../model/dto/SysMenuDto';
import { ResultData } from 'src/common/modal/ResultData';

@Controller("system/menu")
export class SysMenuController {

  constructor(private readonly sysMenuService: SysMenuService) {

  }

  @Get("get")
  get(): string {
    const menuReq = new SysMenuReq()
    return this.sysMenuService.findAll(menuReq);
  }

  @Post("create")
  create(@Body() sysMenuDto : SysMenuDto) {
    this.sysMenuService.create(sysMenuDto);
    return ResultData.ok()
  }

}
