import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request } from "@nestjs/common";
import { SysDeptService } from "../service/SysDept.service";
import { SysDeptReq } from "../model/req/SysDeptReq";
import { ResultData } from "src/common/model/ResultData";
import { SysDeptDto } from "../model/dto/SysDeptDto";

@Controller('system/dept')
export class SysDeptController {
  constructor(
    private readonly deptService:SysDeptService
  ) {}


  @Get('/list')
  findAll(@Query() query: SysDeptReq) {
    return this.deptService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.deptService.findOne(+id);
    return ResultData.ok(data);
  }

  @Post()
  @HttpCode(200)
  create(@Body() createDeptDto: SysDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Get('/list/exclude/:id')
  findListExclude(@Param('id') id: string) {
    return this.deptService.findListExclude(+id);
  }

  @Put()
  update(@Body() updateDeptDto: SysDeptDto) {
    return this.deptService.update(updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }

}
