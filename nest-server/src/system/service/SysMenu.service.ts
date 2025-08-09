import { Injectable } from '@nestjs/common';
import {SysMenuReq} from '../model/req/SysMenuReq'
import { SysMenuDto } from '../model/dto/SysMenuDto';
import { ResultData } from 'src/common/modal/ResultData';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SysMenuEntity } from '../model/entity/SysMenu.entity';
import { SysMenuDao } from '../dao/SysMenu.dao';

@Injectable()
export class SysMenuService {

  constructor(
    private readonly sysMenuDao:SysMenuDao,
    @InjectRepository(SysMenuEntity)
    private readonly sysMenuEntityRepository: Repository<SysMenuEntity>,
  ){}

  async create(sysMenuDto: SysMenuDto) {
    //@ts-ignore
    const res = await this.sysMenuEntityRepository.save(sysMenuDto);
    return ResultData.ok(res);
  }

  findAll(query: SysMenuReq) {
    return "zhanjian";
  }
}