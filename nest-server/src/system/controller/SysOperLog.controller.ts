import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { SysOperLogService } from "../service/SysOperLog.service";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";
import { SysOperLogReq } from "../model/req/SysOperLogReq";
import { ResultData } from "src/common/model/ResultData";
import { SysOperLogDto } from "../model/dto/SysOperLogDto";
import { Log } from "src/common/interceptor/Log";
import { BusinessType } from "src/common/model/enum/BusinessType";

@ApiTags('操作日志记录')
@Controller('system/sysOperLog')
export class SysOperLogController {

    constructor(
      private readonly sysOperLogService:SysOperLogService
    ) {
    }
    
    @ApiOperation({
      summary: '操作日志记录-list',
    })
    @RequirePermission("system:sysOperLog:list")
    @Get('list')
    async findList(@Query() sysOperLogReq: SysOperLogReq) {
      const [list,totals] = await this.sysOperLogService.findList(sysOperLogReq);
      return ResultData.list(list,totals);
    }
    
    @ApiOperation({
      summary: '操作日志记录-create',
    })
    @ApiBody({
      type: SysOperLogDto,
      required: true,
    })
    @Log({title:"操作日志记录-ADD",businessType:BusinessType.ADD})
    @RequirePermission("system:sysOperLog:add")
    @Post()
    async create(@Body(new ValidationPipe()) createSysOperLogDto: SysOperLogDto) {
      await this.sysOperLogService.create(createSysOperLogDto);
      return ResultData.ok();
    }

    @ApiOperation({ summary: '导出操作日志记录xlsx文件' })
    @RequirePermission("system:sysOperLog:export")
    @Get('/export')
    async export(@Res() res: Response, @Query() req: SysOperLogReq): Promise<any> {
      return this.sysOperLogService.export(res, req);
    }
    
    @ApiOperation({
      summary: '操作日志记录-detail',
    })
    @RequirePermission("system:sysOperLog:query")
    @Get('/:id')
    async findOne(@Param('id') id: number) {
      const entity = await this.sysOperLogService.findOne(+id)
      return ResultData.ok(entity);
    }
    
    @ApiOperation({
      summary: '操作日志记录-update',
    })
    @ApiBody({
      type: SysOperLogDto,
      required: true,
    })
    @Log({title:"操作日志记录-EDIT",businessType:BusinessType.EDIT})
    @RequirePermission("system:sysOperLog:edit")
    @Put()
    async update(@Body(new ValidationPipe()) updateSysOperLogDto: SysOperLogDto) {
      await this.sysOperLogService.update(updateSysOperLogDto);
      return ResultData.ok();
    }
    

    @ApiOperation({
      summary: '操作日志记录-delete',
    })
    @Log({title:"操作日志记录-DELETE",businessType:BusinessType.DELETE})
    @RequirePermission("system:sysOperLog:remove")
    @Delete('/:ids')
    async remove(@Param('ids') ids: string) {
      const idList = ids.split(',').map((id) => +id);
      await this.sysOperLogService.remove(idList);
      return ResultData.ok();
    }
}