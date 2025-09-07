import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Res, Response
} from "@nestjs/common";
import { SysDictDataService } from "../service/SysDictData.service";
import { ListDictData } from "../model/req/ListDictData";
import { SysDictDataDto } from "../model/dto/SysDictDataDto";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from 'src/common/interceptor/Log';
import { BusinessType } from 'src/common/model/enum/BusinessType';

@ApiTags('字典数据')
@Controller('system/dict/data')
export class SysDictDataController {
  constructor(
    private readonly dictDataService: SysDictDataService
  ) {}

  @ApiOperation({
    summary: '字典数据-列表',
  })
  @RequirePermission("system:dict:list")
  @Get('/list')
  findAllData(@Query() query: ListDictData) {
    return this.dictDataService.findAllData(query);
  }

  @ApiOperation({
    summary: '字典数据-类型-详情【走缓存】',
  })
  @RequirePermission("system:dict:query")
  @Get('/type/:id')
  findOneDataType(@Param('id') dictType: string) {
    return this.dictDataService.findOneDataType(dictType);
  }
  
  @ApiOperation({
    summary: '字典数据-创建',
  })
  @HttpCode(200)
  @Log({title:"字典数据-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:dict:add")
  @Post()
  createDictData(@Body() createDictDataDto: SysDictDataDto) {
    return this.dictDataService.createDictData(createDictDataDto);
  }

  @ApiOperation({
    summary: '字典数据-删除',
  })
  @Log({title:"字典数据-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:dict:remove")
  @Delete('/:id')
  deleteDictData(@Param('id') ids: string) {
    const dictDataIds = ids.split(',').map((id) => +id);
    return this.dictDataService.deleteDictData(dictDataIds);
  }

  @ApiOperation({
    summary: '字典数据-修改',
  })
  @Log({title:"字典数据-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:dict:edit")
  @Put()
  updateDictData(@Body() updateDictDataDto: SysDictDataDto) {
    return this.dictDataService.updateDictData(updateDictDataDto);
  }

  @ApiOperation({ summary: '导出字典数据为xlsx文件' })
  @RequirePermission("system:dict:export")
  @Get('/export')
  async export(@Res() res: Response, @Query() query: ListDictData): Promise<void> {
    return this.dictDataService.export(res, query);
  }

}
