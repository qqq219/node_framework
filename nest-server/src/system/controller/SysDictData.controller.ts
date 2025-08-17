import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Res, Response
} from "@nestjs/common";
import { SysDictDataService } from "../service/SysDictData.service";
import { ListDictData } from "../model/req/ListDictData";
import { SysDictDataDto } from "../model/dto/SysDictDataDto";

@Controller('system/dict/data')
export class SysDictDataController {
  constructor(
    private readonly dictDataService: SysDictDataService
  ) {}

  @Get('/list')
  findAllData(@Query() query: ListDictData) {
    return this.dictDataService.findAllData(query);
  }

  @Get('/type/:id')
  findOneDataType(@Param('id') dictType: string) {
    return this.dictDataService.findOneDataType(dictType);
  }
  
  
  @Post()
  createDictData(@Body() createDictDataDto: SysDictDataDto) {
    return this.dictDataService.createDictData(createDictDataDto);
  }

  @Delete('/:id')
  deleteDictData(@Param('id') id: string) {
    return this.dictDataService.deleteDictData(+id);
  }

  @Put()
  updateDictData(@Body() updateDictDataDto: SysDictDataDto) {
    return this.dictDataService.updateDictData(updateDictDataDto);
  }

  @Get('/export')
  async export(@Res() res: Response, @Query() query: ListDictData): Promise<void> {
    return this.dictDataService.export(res, query);
  }

}
