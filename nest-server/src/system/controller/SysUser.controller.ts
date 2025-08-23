import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, Response, UsePipes, ValidationPipe } from "@nestjs/common";

import { SysUserService } from "../service/SysUser.service";
import { SysUserReq } from "../model/req/SysUserReq";
import { SysUserDto } from "../model/dto/SysUserDto";
import { ChangeUserStatusReq } from "../model/req/ChangeUserStatusReq";
import { ResetUserPwdReq } from "../model/req/ResetUserPwdReq";
import { UserAssignRoleReq } from "../model/req/UserAssignRoleReq";
import { UpdateProfileReq } from "../model/req/UpdateProfileReq";
import { UpdatePwdReq } from "../model/req/UpdatePwdReq";
import { ResultData } from "src/common/model/ResultData";

@Controller('system/user')
export class SysUserController {
  constructor(
    private readonly userService: SysUserService,
  ) {}

  @Get("/getInfo")
  getInfo(@Request() req): any {
    let res = ResultData.ok() as any;
    res.user = req.user.user;
    this.userService.deleteFileds(res.user)
    res.roles = req.user.roles;
    res.permissions = req.user.permissions;
    return res;
  }

  @Get('deptTree')
  deptTree() {
    return this.userService.deptTree();
  }

  @Get('list')
  findAll(@Query() query: SysUserReq, @Request() req) {
    const user = req?.user?.user;
    return this.userService.findAll(query, user);
  }

  @Post()
  create(@Body() createUserDto: SysUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('changeStatus')
  changeStatus(@Body() changeStatusDto: ChangeUserStatusReq) {
    return this.userService.changeStatus(changeStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') ids: string) {
    const menuIds = ids.split(',').map((id) => +id);
    return this.userService.remove(menuIds);
  }

  @Put()
  update(@Body() updateUserDto: SysUserDto, @Request() req) {
    const userId = req?.user?.userId;
    return this.userService.update(updateUserDto, userId);
  }

  @Put('resetPwd')
  resetPwd(@Body() body: ResetUserPwdReq) {
    return this.userService.resetPwd(body);
  }

  @Put('authRole')
  updateAuthRole(@Query() query:UserAssignRoleReq) {
    return this.userService.updateAuthRole(query);
  }

  @Get('authRole/:id')
  authRole(@Param('id') id: string) {
    return this.userService.authRole(+id);
  }

  @Get('export')
  async export(@Res() res: Response, @Query() query: SysUserReq, @Request() req): Promise<void> {
    const user = req.user.user;
    return this.userService.export(res, query, user);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(+userId);
  }

  @Get('/profile')
  profile(@Request() req) {
    const user = req.user.user;
    return ResultData.ok(user);
  }

  @Put('/profile')
  updateProfile(@Request() req, @Body() updateProfileReq: UpdateProfileReq) {
    const user = req.user;
    return this.userService.updateProfile(user, updateProfileReq);
  }

  @Put('/profile/updatePwd')
  updatePwd(@Request() req, @Query() updatePwdReq: UpdatePwdReq) {
    const user = req.user;
    return this.userService.updatePwd(user, updatePwdReq);
  }


}
