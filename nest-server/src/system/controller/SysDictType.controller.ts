import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Res,Response } from "@nestjs/common";
import { ListDictType } from "../model/req/ListDictType";
import { SysDictTypeService } from "../service/SysDictType.service";
import { SysDictTypeDto } from "../model/dto/SysDictTypeDto";
import { ResultData } from "src/common/model/ResultData";
import { RequirePermission } from "src/auth/decorator/RequirePremission.decorator";

@Controller('system/dict/type')
export class SysDictTypeController {
  constructor(
    private readonly dictTypeService: SysDictTypeService
  ) {}

  @RequirePermission("system:dict:list")
  @Get('/list')
  findAllData(@Query() query: ListDictType) {
    return this.dictTypeService.findAllType(query);
  }

  //字典类型
  @HttpCode(200)
  @RequirePermission("system:dict:add")
  @Post()
  createType(@Body() createDictTypeDto: SysDictTypeDto) {
    return this.dictTypeService.createType(createDictTypeDto);
  }

  @RequirePermission("system:dict:edit")
  @Put()
  updateType(@Body() updateDictTypeDto: SysDictTypeDto) {
    return this.dictTypeService.updateType(updateDictTypeDto);
  }

  @RequirePermission("system:dict:remove")
  @Delete('/:id')
  deleteType(@Param('id') ids: string) {
    const dictIds = ids.split(',').map((id) => +id);
    return this.dictTypeService.deleteType(dictIds);
  }

  @RequirePermission("system:dict:export")
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
