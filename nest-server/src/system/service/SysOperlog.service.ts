
import { Injectable } from "@nestjs/common";
import { SysOperLogReq } from "../model/req/SysOperLogReq";
import { SysOperLogDao } from "../dao/SysOperLog.dao";
import { SysOperLogDto } from "../model/dto/SysOperLogDto";

@Injectable()
export class SysOperLogService {

    constructor(
      private readonly sysOperLogDao:SysOperLogDao
    ) {
    }
    
    async findList(sysOperLogReq: SysOperLogReq) {
      return await this.sysOperLogDao.selectSysOperLogList(sysOperLogReq);
    }
    
    async create(createSysOperLogDto: SysOperLogDto) {
      return await this.sysOperLogDao.insertSysOperLog(createSysOperLogDto);
    }
    
    async findOne(id: number) {
      return await this.sysOperLogDao.selectSysOperLogById(id);
    }
    
    async update(updateSysOperLogDto: SysOperLogDto) {
      return await this.sysOperLogDao.updateSysOperLog(updateSysOperLogDto);
    }
    
    async remove(idList: number[]) {
      return await this.sysOperLogDao.deleteSysOperLogByIds(idList);
    }

}
