
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { SysNoticeService } from "../service/SysNotice.service";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";
import { SysNoticeReq } from "../model/req/SysNoticeReq";
import { ResultData } from "src/common/model/ResultData";
import { SysNoticeDto } from "../model/dto/SysNoticeDto";
import { Log } from "src/common/interceptor/Log";
import { BusinessType } from "src/common/model/enum/BusinessType";

@ApiTags('通知公告表')
@Controller('system/sysNotice')
export class SysNoticeController {

    constructor(
      private readonly sysNoticeService:SysNoticeService
    ) {
    }
    
    @ApiOperation({
      summary: '通知公告表-list',
    })
    @RequirePermission("system:sysNotice:list")
    @Get('list')
    async findList(@Query() sysNoticeReq: SysNoticeReq) {
      const [list,totals] = await this.sysNoticeService.findList(sysNoticeReq);
      return ResultData.list(list,totals);
    }
    
    @ApiOperation({
      summary: '通知公告表-create',
    })
    @ApiBody({
      type: SysNoticeDto,
      required: true,
    })
    @Log({title:"通知公告表-ADD",businessType:BusinessType.ADD})
    @RequirePermission("system:sysNotice:add")
    @Post()
    async create(@Body(new ValidationPipe()) createSysNoticeDto: SysNoticeDto) {
      await this.sysNoticeService.create(createSysNoticeDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '通知公告表-detail',
    })
    @RequirePermission("system:sysNotice:query")
    @Get('/:id')
    async findOne(@Param('id') id: number) {
      const entity = await this.sysNoticeService.findOne(+id)
      return ResultData.ok(entity);
    }
    
    @ApiOperation({
      summary: '通知公告表-update',
    })
    @ApiBody({
      type: SysNoticeDto,
      required: true,
    })
    @Log({title:"通知公告表-EDIT",businessType:BusinessType.EDIT})
    @RequirePermission("system:sysNotice:edit")
    @Put()
    async update(@Body(new ValidationPipe()) updateSysNoticeDto: SysNoticeDto) {
      await this.sysNoticeService.update(updateSysNoticeDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '通知公告表-delete',
    })
    @Log({title:"通知公告表-DELETE",businessType:BusinessType.DELETE})
    @RequirePermission("system:sysNotice:remove")
    @Delete('/:ids')
    async remove(@Param('ids') ids: string) {
      const idList = ids.split(',').map((id) => +id);
      await this.sysNoticeService.remove(idList);
      return ResultData.ok();
    }

}
    