import { Module } from '@nestjs/common';
import { SysMenuController } from './controller/SysMenu.controller';
import { SysMenuService } from './service/SysMenu.service';
import { SysMenuDao } from './dao/SysMenu.dao';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SysMenuEntity } from './model/entity/SysMenu.entity';

@Module({
  imports: [
    // database table entity
    TypeOrmModule.forFeature([
      SysMenuEntity
    ])
  ],
  controllers: [SysMenuController],
  providers: [
    //service
    ...[
        SysMenuService
    ],
    //dao
    ...[
        SysMenuDao
    ]
  ],
  exports: []
})
export class SystemModule {}