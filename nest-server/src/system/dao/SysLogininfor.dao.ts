
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SysLogininforEntity } from "../model/entity/SysLogininfor.entity";
import { SysLogininforReq } from "../model/req/SysLogininforReq";
import { SysLogininforDto } from "../model/dto/SysLogininforDto";
import { StringUtils } from "src/common/utils/StringUtils";

@Injectable()
export class SysLogininforDao {

    constructor(
      @InjectRepository(SysLogininforEntity)
      private readonly sysLogininforDaoRepository: Repository<SysLogininforEntity>,
    ) {
    }
    
    async selectSysLogininforList(query: SysLogininforReq) {
      const entity = this.sysLogininforDaoRepository.createQueryBuilder("entity")
      entity.where('1=1');
    
      
      if (StringUtils.isNotEmpty(query.infoId)) {
        entity.andWhere(`entity.infoId = "${query.infoId}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.userName)) {
        entity.andWhere(`entity.userName LIKE "%${query.userName}%"`);
      }   
        
      if (StringUtils.isNotEmpty(query.ipaddr)) {
        entity.andWhere(`entity.ipaddr = "${query.ipaddr}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.loginLocation)) {
        entity.andWhere(`entity.loginLocation = "${query.loginLocation}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.browser)) {
        entity.andWhere(`entity.browser = "${query.browser}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.os)) {
        entity.andWhere(`entity.os = "${query.os}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.status)) {
        entity.andWhere(`entity.status = "${query.status}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.msg)) {
        entity.andWhere(`entity.msg = "${query.msg}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.loginTime)) {
        entity.andWhere(`entity.loginTime = "${query.loginTime}"`);
      }   
        
    
      if (query.pageSize && query.current) {
        entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
      }
      return await entity.getManyAndCount();
    }
    
    async insertSysLogininfor(createSysLogininforDto: SysLogininforDto) {
      return this.sysLogininforDaoRepository.insert(createSysLogininforDto);
    }
    
    async selectSysLogininforById(id: number) {
      return this.sysLogininforDaoRepository.findOne({
        where: {
          infoId: id
        },
      });
    }
    
    async updateSysLogininfor(updateSysLogininforDto: SysLogininforDto) {
      return this.sysLogininforDaoRepository.update({
          infoId: updateSysLogininforDto.infoId,
        },
        updateSysLogininforDto
      )
    }
    
    async deleteSysLogininforByIds(idList: number[]) {
      return await this.sysLogininforDaoRepository.delete(
        { infoId: In(idList) }
      );
    }
}

    