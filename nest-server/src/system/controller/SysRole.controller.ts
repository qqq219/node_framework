import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete,Response, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SysRoleReq } from '../model/req/SysRoleReq';
import { SysUserService } from '../service/SysUser.service';
import { SysRoleService } from '../service/SysRole.service';
import { ChangeRoleStatusReq } from '../model/req/ChangeRoleStatusReq';
import { SysRoleDto } from '../model/dto/SysRoleDto';
import { AuthUserCancelReq } from '../model/req/AuthUserCancelReq';
import { AllocatedReq } from '../model/req/AllocatedReq';
import { AuthUserSelectAllDto } from '../model/req/AuthUserSelectAllReq';
import { RequirePermission } from 'src/auth/decorator/RequirePremission.decorator';

@Controller('system/role')
export class SysRoleController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly sysRoleService: SysRoleService,
  ) {}


  @RequirePermission("system:role:list")
  @Get('list')
  findAll(@Query() query: SysRoleReq) {
    return this.sysRoleService.findAll(query);
  }

  @RequirePermission("system:role:edit")
  @Put('changeStatus')
  changeStatus(@Body() changeStatusDto: ChangeRoleStatusReq) {
    return this.sysRoleService.changeStatus(changeStatusDto);
  }

  @RequirePermission("system:role:add")
  @Post("create")
  create(@Body() createRoleDto: SysRoleDto) {
    return this.sysRoleService.create(createRoleDto);
  }

  @RequirePermission("system:role:edit")
  @Put()
  update(@Body() updateRoleDto: SysRoleDto) {
    return this.sysRoleService.update(updateRoleDto);
  }

  @RequirePermission("system:role:remove")
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const menuIds = ids.split(',').map((id) => +id);
    return this.sysRoleService.remove(menuIds);
  }

  @Put('authUser/cancel')
  authUserCancel(@Body() body: AuthUserCancelReq) {
    return this.sysUserService.authUserCancel(body);
  }

  @Get('deptTree/:id')
  deptTree(@Param('id') id: string) {
    return this.sysRoleService.deptTree(+id);
  }

  @Get('authUser/allocatedList')
  authUserAllocatedList(@Query() query: AllocatedReq) {
    return this.sysUserService.allocatedList(query);
  }

  @Get('authUser/unallocatedList')
  authUserUnAllocatedList(@Query() query: AllocatedReq) {
    return this.sysUserService.unallocatedList(query);
  }

  @Put('authUser/selectAll')
  authUserSelectAll(@Query() params: AuthUserSelectAllDto) {
    return this.sysUserService.authUserSelectAll(params);
  }

  @Put('dataScope')
  dataScope(@Body() updateRoleDto: SysRoleDto) {
    return this.sysRoleService.dataScope(updateRoleDto);
  }

  @RequirePermission("system:role:export")
  @Get('/export')
  async export(@Res() res: Response, @Query() body: SysRoleReq): Promise<void> {
    return this.sysRoleService.export(res, body);
  }

  @RequirePermission("system:role:query")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysRoleService.findOne(+id);
  }
}
