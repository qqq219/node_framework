import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Res, Response
} from "@nestjs/common";
import { SysDictDataService } from "../service/SysDictData.service";
import { ListDictData } from "../model/req/ListDictData";
import { SysDictDataDto } from "../model/dto/SysDictDataDto";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";

@Controller('system/dict/data')
export class SysDictDataController {
  constructor(
    private readonly dictDataService: SysDictDataService
  ) {}

  @Get('/list')
  @RequirePermission("system:dict:list")
  indAllData(@Query() query: ListDictData) {
    return this.dictDataService.findAllData(query);
  }

  @Get('/type/:id')
  @RequirePermission("system:dict:query")
  findOneDataType(@Param('id') dictType: string) {
    return this.dictDataService.findOneDataType(dictType);
  }
  
  
  @Post()
  @RequirePermission("system:dict:add")
  createDictData(@Body() createDictDataDto: SysDictDataDto) {
    return this.dictDataService.createDictData(createDictDataDto);
  }

  @Delete('/:id')
  @RequirePermission("system:dict:remove")
  deleteDictData(@Param('id') ids: string) {
    const dictDataIds = ids.split(',').map((id) => +id);
    return this.dictDataService.deleteDictData(dictDataIds);
  }

  @Put()
  @RequirePermission("system:dict:edit")
  updateDictData(@Body() updateDictDataDto: SysDictDataDto) {
    return this.dictDataService.updateDictData(updateDictDataDto);
  }

  @Get('/export')
  @RequirePermission("system:dict:export")
  async export(@Res() res: Response, @Query() query: ListDictData): Promise<void> {
    return this.dictDataService.export(res, query);
  }

}
