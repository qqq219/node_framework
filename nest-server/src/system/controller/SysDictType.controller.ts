import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Res,Response } from "@nestjs/common";
import { ListDictType } from "../model/req/ListDictType";
import { SysDictTypeService } from "../service/SysDictType.service";
import { SysDictTypeDto } from "../model/dto/SysDictTypeDto";
import { ResultData } from "src/common/model/ResultData";

@Controller('system/dict/type')
export class SysDictTypeController {
  constructor(
    private readonly dictTypeService: SysDictTypeService
  ) {}

  @Get('/list')
  findAllData(@Query() query: ListDictType) {
    return this.dictTypeService.findAllType(query);
  }

  @Get('/getByDictType')
  getByDictType(@Query() dictTypeObj: ListDictType) {
    const {dictType} = dictTypeObj
    return this.dictTypeService.findOneByDictType(dictType?dictType:"");
  }

  //字典类型
  @Post()
  createType(@Body() createDictTypeDto: SysDictTypeDto) {
    return this.dictTypeService.createType(createDictTypeDto);
  }

  @Put()
  updateType(@Body() updateDictTypeDto: SysDictTypeDto) {
    return this.dictTypeService.updateType(updateDictTypeDto);
  }

  @Delete('/:id')
  deleteType(@Param('id') ids: string) {
    const dictIds = ids.split(',').map((id) => +id);
    return this.dictTypeService.deleteType(dictIds);
  }

  @Get('/export')
  async export(@Res() res: Response, @Query() query: ListDictType): Promise<void> {
    return this.dictTypeService.export(res, query);
  }


  @Get('/optionselect')
  findOptionselect() {
    return this.dictTypeService.findOptionselect();
  }

  @Get('/:id')
  findOneType(@Param('id') id: string) {
    return this.dictTypeService.findOneType(+id);
  }

}
