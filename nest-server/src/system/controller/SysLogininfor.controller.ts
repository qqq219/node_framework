import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { SysLogininforService } from "../service/SysLogininfor.service";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";
import { SysLogininforReq } from "../model/req/SysLogininforReq";
import { ResultData } from "src/common/model/ResultData";
import { SysLogininforDto } from "../model/dto/SysLogininforDto";
import { Log } from "src/common/interceptor/Log";
import { BusinessType } from "src/common/model/enum/BusinessType";

@ApiTags('系统访问记录')
@Controller('system/sysLogininfor')
export class SysLogininforController {

    constructor(
      private readonly sysLogininforService:SysLogininforService
    ) {
    }
    
    @ApiOperation({ summary: '导出系统访问记录xlsx文件' })
    @RequirePermission("system:sysLogininfor:export")
    @Get('/export')
    async export(@Res() res: Response, @Query() req: SysLogininforReq): Promise<any> {
      return this.sysLogininforService.export(res, req);
    }
    
    @ApiOperation({
      summary: '系统访问记录-list',
    })
    @RequirePermission("system:sysLogininfor:list")
    @Get('list')
    async findList(@Query() sysLogininforReq: SysLogininforReq) {
      const [list,totals] = await this.sysLogininforService.findList(sysLogininforReq);
      return ResultData.list(list,totals);
    }
    
    @ApiOperation({
      summary: '系统访问记录-create',
    })
    @ApiBody({
      type: SysLogininforDto,
      required: true,
    })
    @Log({title:"系统访问记录-ADD",businessType:BusinessType.ADD})
    @RequirePermission("system:sysLogininfor:add")
    @Post()
    async create(@Body(new ValidationPipe()) createSysLogininforDto: SysLogininforDto) {
      await this.sysLogininforService.create(createSysLogininforDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '系统访问记录-detail',
    })
    @RequirePermission("system:sysLogininfor:query")
    @Get('/:id')
    async findOne(@Param('id') id: number) {
      const entity = await this.sysLogininforService.findOne(+id)
      return ResultData.ok(entity);
    }
    
    @ApiOperation({
      summary: '系统访问记录-update',
    })
    @ApiBody({
      type: SysLogininforDto,
      required: true,
    })
    @Log({title:"系统访问记录-EDIT",businessType:BusinessType.EDIT})
    @RequirePermission("system:sysLogininfor:edit")
    @Put()
    async update(@Body(new ValidationPipe()) updateSysLogininforDto: SysLogininforDto) {
      await this.sysLogininforService.update(updateSysLogininforDto);
      return ResultData.ok();
    }
    

    @ApiOperation({
      summary: '系统访问记录-delete',
    })
    @Log({title:"系统访问记录-DELETE",businessType:BusinessType.DELETE})
    @RequirePermission("system:sysLogininfor:remove")
    @Delete('/:ids')
    async remove(@Param('ids') ids: string) {
      const idList = ids.split(',').map((id) => +id);
      await this.sysLogininforService.remove(idList);
      return ResultData.ok();
    }

}