import { Module } from '@nestjs/common';
import { SysMenuController } from './controller/SysMenu.controller';
import { SysMenuService } from './service/SysMenu.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SysMenuEntity } from './model/entity/SysMenu.entity';
import { SysMenuDao } from './dao/SysMenu.dao';
import { SysDeptController } from './controller/SysDept.controller';
import { SysDeptEntity } from './model/entity/SysDept.entity';
import { SysDeptService } from './service/SysDept.service';
import { SysDeptDao } from './dao/SysDept.dao';
import { SysPostService } from './service/SysPost.service';
import { SysPostDao } from './dao/SysPost.dao';
import { SysPostEntity } from './model/entity/SysPost.entity';
import { SysPostController } from './controller/SysPost.controller';
import { SysDictDataEntity } from './model/entity/SysDictData.entity';
import { SysDictTypeEntity } from './model/entity/SysDictType.entity';
import { SysDictTypeController } from './controller/SysDictType.controller';
import { SysDictTypeService } from './service/SysDictType.service';
import { SysDictDataService } from './service/SysDictData.service';
import { SysDictTypeDao } from './dao/SysDictType.dao';
import { SysDictDataDao } from './dao/SysDictData.dao';
import { SysDictDataController } from './controller/SysDictData.controller';
import { SysConfigController } from './controller/SysConfig.controller';
import { SysConfigEntity } from './model/entity/SysConfig.entity';
import { SysConfigService } from './service/SysConfig.service';
import { SysConfigDao } from './dao/SysConfig.dao';
import { RedisUtil } from 'src/common/utils/Redis.tool';
import { SysRoleController } from './controller/SysRole.controller';
import { SysRoleDao } from './dao/SysRole.dao';
import { SysRoleEntity } from './model/entity/SysRole.entity';
import { SysRoleService } from './service/SysRole.service';
import { SysUserDao } from './dao/SysUser.dao';
import { SysUserService } from './service/SysUser.service';
import { SysRoleMenuEntity } from './model/entity/SysRoleMenu.entity';
import { SysUserEntity } from './model/entity/SysUser.entity';
import { SysRoleDeptEntity } from './model/entity/SysRoleDept.entity';
import { SysUserPostEntity } from './model/entity/SysUserPost.entity';
import { SysUserRoleEntity } from './model/entity/SysUserRole.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysMenuEntity, SysDeptEntity, SysPostEntity, SysDictDataEntity, SysDictTypeEntity, SysConfigEntity, SysRoleEntity, SysRoleMenuEntity,SysUserEntity,
      SysUserPostEntity,SysUserRoleEntity,SysRoleDeptEntity
    ])
  ],
  controllers: [SysMenuController, SysDeptController, SysPostController, SysDictTypeController, SysDictDataController, SysConfigController, SysRoleController
    
  ],
  providers: [
    //service
    ...[
        SysMenuService, SysDeptService, SysPostService, SysDictTypeService, SysDictDataService, SysConfigService, RedisUtil, SysRoleService, SysUserService
    ],
    //dao
    ...[
      SysMenuDao, SysDeptDao, SysPostDao, SysDictTypeDao, SysDictDataDao, SysConfigDao, SysRoleDao, SysUserDao
    ]
  ],
  exports: []
})
export class SystemModule {}