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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysMenuEntity, SysDeptEntity, SysPostEntity, SysDictDataEntity, SysDictTypeEntity
    ])
  ],
  controllers: [SysMenuController, SysDeptController, SysPostController, SysDictTypeController, SysDictDataController],
  providers: [
    //service
    ...[
        SysMenuService, SysDeptService, SysPostService, SysDictTypeService, SysDictDataService
    ],
    //dao
    ...[
      SysMenuDao, SysDeptDao, SysPostDao, SysDictTypeDao, SysDictDataDao
    ]
  ],
  exports: []
})
export class SystemModule {}