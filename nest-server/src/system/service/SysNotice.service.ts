
import { Injectable } from "@nestjs/common";
import { SysNoticeReq } from "../model/req/SysNoticeReq";
import { SysNoticeDao } from "../dao/SysNotice.dao";
import { SysNoticeDto } from "../model/dto/SysNoticeDto";

@Injectable()
export class SysNoticeService {

    constructor(
      private readonly sysNoticeDao:SysNoticeDao
    ) {
    }
    
    async findList(sysNoticeReq: SysNoticeReq) {
      return await this.sysNoticeDao.selectSysNoticeList(sysNoticeReq);
    }
    
    async create(createSysNoticeDto: SysNoticeDto) {
      return await this.sysNoticeDao.insertSysNotice(createSysNoticeDto);
    }
    
    async findOne(id: number) {
      return await this.sysNoticeDao.selectSysNoticeById(id);
    }
    
    async update(updateSysNoticeDto: SysNoticeDto) {
      return await this.sysNoticeDao.updateSysNotice(updateSysNoticeDto);
    }
    
    async remove(idList: number[]) {
      return await this.sysNoticeDao.deleteSysNoticeByIds(idList);
    }

}
