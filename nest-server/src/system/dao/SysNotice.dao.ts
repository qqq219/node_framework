
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SysNoticeEntity } from "../model/entity/SysNotice.entity";
import { SysNoticeReq } from "../model/req/SysNoticeReq";
import { SysNoticeDto } from "../model/dto/SysNoticeDto";
import { StringUtils } from "src/common/utils/StringUtils";

@Injectable()
export class SysNoticeDao {

    constructor(
      @InjectRepository(SysNoticeEntity)
      private readonly sysNoticeDaoRepository: Repository<SysNoticeEntity>,
    ) {
    }
    
    async selectSysNoticeList(query: SysNoticeReq) {
      const entity = this.sysNoticeDaoRepository.createQueryBuilder("entity")
      entity.where('1=1');
    
      
      if (StringUtils.isNotEmpty(query.noticeId)) {
        entity.andWhere(`entity.noticeId = "${query.noticeId}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.noticeTitle)) {
        entity.andWhere(`entity.noticeTitle = "${query.noticeTitle}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.noticeType)) {
        entity.andWhere(`entity.noticeType = "${query.noticeType}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.noticeContent)) {
        entity.andWhere(`entity.noticeContent = "${query.noticeContent}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.status)) {
        entity.andWhere(`entity.status = "${query.status}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.remark)) {
        entity.andWhere(`entity.remark = "${query.remark}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.createBy)) {
        entity.andWhere(`entity.createBy = "${query.createBy}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.createTime)) {
        entity.andWhere(`entity.createTime = "${query.createTime}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.updateBy)) {
        entity.andWhere(`entity.updateBy = "${query.updateBy}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.updateTime)) {
        entity.andWhere(`entity.updateTime = "${query.updateTime}"`);
      }   
        
    
      if (query.pageSize && query.current) {
        entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
      }
      return await entity.getManyAndCount();
    }
    
    async insertSysNotice(createSysNoticeDto: SysNoticeDto) {
      return this.sysNoticeDaoRepository.insert(createSysNoticeDto);
    }
    
    async selectSysNoticeById(id: number) {
      return this.sysNoticeDaoRepository.findOne({
        where: {
          noticeId: id
        },
      });
    }
    
    async updateSysNotice(updateSysNoticeDto: SysNoticeDto) {
      return this.sysNoticeDaoRepository.update({
          noticeId: updateSysNoticeDto.noticeId,
        },
        updateSysNoticeDto
      )
    }
    
    async deleteSysNoticeByIds(idList: number[]) {
      return await this.sysNoticeDaoRepository.delete(
        { noticeId: In(idList) }
      );
    }
}

    