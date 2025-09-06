import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res ,Response } from "@nestjs/common";
import { SysPostService } from "../service/SysPost.service";
import { SysPostReq } from "../model/req/SysPostReq";
import { SysPostDto } from "../model/dto/SysPostDto";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";

@Controller('system/post')
export class SysPostController {
  constructor(
    private readonly postService:SysPostService,
  ) {}

  @RequirePermission("system:post:list")
  @Get('/list')
  findAll(@Query() query: SysPostReq) {
    return this.postService.findAll(query);
  }

  @RequirePermission("system:post:add")
  @Post()
  create(@Body() createPostDto: SysPostDto) {
    return this.postService.create(createPostDto);
  }

  @RequirePermission("system:post:query")
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @RequirePermission("system:post:edit")
  @Put()
  update(@Body() updatePostDto: SysPostDto) {
    return this.postService.update(updatePostDto);
  }

  @RequirePermission("system:post:remove")
  @Delete('/:ids')
  remove(@Param('ids') ids: string) {
    const menuIds = ids.split(',').map((id) => id);
    return this.postService.remove(menuIds);
  }
  
  @RequirePermission("system:post:export")
  @Get('/export')
  async export(@Res() res: Response, @Query() req: SysPostReq): Promise<any> {
    return this.postService.export(res, req);
  }

}
