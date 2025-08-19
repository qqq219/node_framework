import { Injectable } from '@nestjs/common';
import {SysMenuReq} from '../model/req/SysMenuReq'
import { SysMenuDto } from '../model/dto/SysMenuDto';
import { ResultData } from 'src/common/model/ResultData';
import { InjectRepository } from "@nestjs/typeorm";
import { SysMenuEntity } from '../model/entity/SysMenu.entity';
import { Repository, In, FindManyOptions } from 'typeorm';
import { SysMenuDao } from '../dao/SysMenu.dao';
import { ListToTree, Uniq } from 'src/common/utils/normal.tool';
import { SysRoleMenuEntity } from '../model/entity/SysRoleMenu.entity';

@Injectable()
export class SysMenuService {

  constructor(

    private readonly sysMenuDao:SysMenuDao,

    @InjectRepository(SysMenuEntity)
    private readonly repository: Repository<SysMenuEntity>,

    @InjectRepository(SysRoleMenuEntity)
    private readonly sysRoleMenuEntityRepository: Repository<SysRoleMenuEntity>,
  ){}

  async create(sysMenuDto: SysMenuDto){
      //@ts-ignore
      const entity = await this.repository.save(sysMenuDto);
      return entity;
    
  }

  async findAll(query: SysMenuReq) {
    const res = await this.sysMenuDao.selectMenuList(query);
    return res;
  }

  async remove(menuIds: number[]) {
    for (let menuId of menuIds) {
      const menu = await this.repository.findOne({where:{ menuId: menuId}})
      if(menu){
        //delete children
        if(menu.menuType != 'F'){
          const childrenMenuIds = await this.deepSearchMenu(menu.menuId)
          if(childrenMenuIds){
            await this.remove(childrenMenuIds)
          }
        }
        await this.repository.delete(
          { menuId: menuId }
        );
      }
    }
    return ResultData.ok();
  }

  async update(updateMenuDto: SysMenuDto) {
    if(!updateMenuDto.icon){
      updateMenuDto.icon = "#"
    }
    //@ts-ignore
    const res = await this.repository.update({ menuId: updateMenuDto.menuId }, updateMenuDto);
    return ResultData.ok(res);
  }

  private async deepSearchMenu(menuId: number):Promise<number[] | null>{

    const children = await this.repository.find({
      where:{
        parentId:menuId
      }
    })
    if(!children){
      return null
    }
    return children.map(item=>item.menuId)
  }

  async selectMenuTreeByUserId(metaData:any):Promise<any>{
    // const user = metaData.user
    // const roleIds = user.roles?.map(item=>+item.roleId)
    let menuWidthRoleList:SysMenuEntity[] = [];
    // 超管roleId=1，所有菜单权限
    menuWidthRoleList = await this.repository.find({
      where: {
        status: '0',
      },
      select: ['menuId'],
    });
    // 菜单Id去重
    const menuIds = Uniq(menuWidthRoleList.map((item) => item.menuId));
    // 菜单列表
    const menuList = await this.repository.find({
      where: {
        status: '0',
        menuId: In(menuIds),
      },
      order: {
        orderNum: 'ASC',
      },
    });
    // 构建前端需要的菜单树
    return menuList;
  }

    async treeSelect() {
    const res = await this.repository.find({
      order: {
        orderNum: 'ASC',
      },
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    return ResultData.ok(tree);
  }

  async roleMenuTreeselect(roleId: number): Promise<any> {
    const res = await this.repository.find({
      order: {
        orderNum: 'ASC',
      },
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    const menuIds = await this.sysRoleMenuEntityRepository.find({
      where: { roleId: roleId },
      select: ['menuId'],
    });
    const checkedKeys = menuIds.map((item) => {
      return item.menuId;
    });
    return {
      code:200,
      msg:"success",
      menus: tree,
      checkedKeys: checkedKeys
    }
  }

  async findMany(where: FindManyOptions<SysMenuEntity>) {
    return await this.repository.find(where);
  }
}