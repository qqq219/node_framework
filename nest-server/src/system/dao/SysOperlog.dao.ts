
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SysOperLogEntity } from "../model/entity/SysOperLog.entity";
import { SysOperLogReq } from "../model/req/SysOperLogReq";
import { SysOperLogDto } from "../model/dto/SysOperLogDto";
import { StringUtils } from "src/common/utils/StringUtils";

@Injectable()
export class SysOperLogDao {

    constructor(
      @InjectRepository(SysOperLogEntity)
      private readonly sysOperLogDaoRepository: Repository<SysOperLogEntity>,
    ) {
    }
    
    async selectSysOperLogList(query: SysOperLogReq) {
      const entity = this.sysOperLogDaoRepository.createQueryBuilder("entity")
      entity.where('1=1');
    
      
      if (StringUtils.isNotEmpty(query.operId)) {
        entity.andWhere(`entity.operId = "${query.operId}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.title)) {
        entity.andWhere(`entity.title = "${query.title}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.businessType)) {
        entity.andWhere(`entity.businessType = "${query.businessType}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.method)) {
        entity.andWhere(`entity.method = "${query.method}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.requestMethod)) {
        entity.andWhere(`entity.requestMethod = "${query.requestMethod}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operatorType)) {
        entity.andWhere(`entity.operatorType = "${query.operatorType}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operName)) {
        entity.andWhere(`entity.operName LIKE "%${query.operName}%"`);
      }   
        
      if (StringUtils.isNotEmpty(query.deptName)) {
        entity.andWhere(`entity.deptName LIKE "%${query.deptName}%"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operUrl)) {
        entity.andWhere(`entity.operUrl = "${query.operUrl}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operIp)) {
        entity.andWhere(`entity.operIp = "${query.operIp}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operLocation)) {
        entity.andWhere(`entity.operLocation = "${query.operLocation}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operParam)) {
        entity.andWhere(`entity.operParam = "${query.operParam}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.jsonResult)) {
        entity.andWhere(`entity.jsonResult = "${query.jsonResult}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.status)) {
        entity.andWhere(`entity.status = "${query.status}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.errorMsg)) {
        entity.andWhere(`entity.errorMsg = "${query.errorMsg}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.operTime)) {
        entity.andWhere(`entity.operTime = "${query.operTime}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.costTime)) {
        entity.andWhere(`entity.costTime = "${query.costTime}"`);
      }   
        
    
      if (query.pageSize && query.current) {
        entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
      }
      return await entity.getManyAndCount();
    }
    
    async insertSysOperLog(createSysOperLogDto: SysOperLogDto) {
      return this.sysOperLogDaoRepository.insert(createSysOperLogDto);
    }
    
    async selectSysOperLogById(id: number) {
      return this.sysOperLogDaoRepository.findOne({
        where: {
          operId: id
        },
      });
    }
    
    async updateSysOperLog(updateSysOperLogDto: SysOperLogDto) {
      return this.sysOperLogDaoRepository.update({
          operId: updateSysOperLogDto.operId,
        },
        updateSysOperLogDto
      )
    }
    
    async deleteSysOperLogByIds(idList: number[]) {
      return await this.sysOperLogDaoRepository.delete(
        { operId: In(idList) }
      );
    }
}

    