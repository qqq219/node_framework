import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { DemoTestOneService } from "../service/DemoTestOne.service";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";
import { DemoTestOneReq } from "../model/req/DemoTestOneReq";
import { ResultData } from "src/common/model/ResultData";
import { DemoTestOneDto } from "../model/dto/DemoTestOneDto";
import { Log } from "src/common/interceptor/Log";
import { BusinessType } from "src/common/model/enum/BusinessType";

@ApiTags('测试demo1')
@Controller('system/demoTestOne')
export class DemoTestOneController {

    constructor(
      private readonly demoTestOneService:DemoTestOneService
    ) {
    }
    
    @ApiOperation({
      summary: '测试demo1-list',
    })
    @RequirePermission("system:demoTestOne:list")
    @Get('list')
    async findList(@Query() demoTestOneReq: DemoTestOneReq) {
      const [list,totals] = await this.demoTestOneService.findList(demoTestOneReq);
      return ResultData.list(list,totals);
    }
    
    @ApiOperation({
      summary: '测试demo1-create',
    })
    @ApiBody({
      type: DemoTestOneDto,
      required: true,
    })
    @Log({title:"测试demo1-ADD",businessType:BusinessType.ADD})
    @RequirePermission("system:demoTestOne:add")
    @Post()
    async create(@Body(new ValidationPipe()) createDemoTestOneDto: DemoTestOneDto) {
      await this.demoTestOneService.create(createDemoTestOneDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '测试demo1-detail',
    })
    @RequirePermission("system:demoTestOne:query")
    @Get('/:id')
    async findOne(@Param('id') id: number) {
      const entity = await this.demoTestOneService.findOne(+id)
      return ResultData.ok(entity);
    }
    
    @ApiOperation({
      summary: '测试demo1-update',
    })
    @ApiBody({
      type: DemoTestOneDto,
      required: true,
    })
    @Log({title:"测试demo1-EDIT",businessType:BusinessType.EDIT})
    @RequirePermission("system:demoTestOne:edit")
    @Put()
    async update(@Body(new ValidationPipe()) updateDemoTestOneDto: DemoTestOneDto) {
      await this.demoTestOneService.update(updateDemoTestOneDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '测试demo1-delete',
    })
    @Log({title:"测试demo1-DELETE",businessType:BusinessType.DELETE})
    @RequirePermission("system:demoTestOne:remove")
    @Delete('/:ids')
    async remove(@Param('ids') ids: string) {
      const idList = ids.split(',').map((id) => +id);
      await this.demoTestOneService.remove(idList);
      return ResultData.ok();
    }

}