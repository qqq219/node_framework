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
import { SysUserController } from './controller/SysUser.controller';
import { SysLogininforService } from './service/SysLogininfor.service';
import { SysLogininforEntity } from './model/entity/SysLogininfor.entity';
import { SysLogininforDao } from './dao/SysLogininfor.dao';
import { SysFileController } from './controller/SysFile.controller';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { SysOperlogService } from './service/SysOperlog.service';
import { SysOperlogEntity } from './model/entity/SysOperlog.entity';
import { SysOperlogDao } from './dao/SysOperlog.dao';
import { GenController } from './controller/Gen.controller';
import { GenService } from './service/Gen.service';
import { GenTableColumnEntity } from './model/entity/GenTableCloumn.entity';
import { GenTableEntity } from './model/entity/GenTable.entity';
import { DemoTestOneEntity } from './model/entity/DemoTestOne.entity';
import { DemoTestOneController } from './controller/DemoTestOne.controller';
import { DemoTestOneService } from './service/DemoTestOne.service';
import { DemoTestOneDao } from './dao/DemoTestOne.dao';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
         const rootPath = configService.get("file.uploadPath");// 静态文件目录
         return [
          {
            rootPath,
            serveRoot: configService.get("file.serverPath"),//文件虚拟路径, 必须以 / 开头， 如 http://localhost:8081/static/****.jpg  , 如果不需要则 设置 ''
            serveStaticOptions: {
              cacheControl: true,
            },
          },
        ] as ServeStaticModuleOptions[]
      }
    }),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => <MulterModuleOptions>({
        storage: diskStorage({
            destination: configService.get("file.uploadPath"), // 设置文件上传的目标目录
            filename: (req, file, callback) => {
                const fileExtName = extname(file.originalname); // 获取原始文件名中的扩展名
                const fileName = `${Date.now()}${fileExtName}`;
                // 使用当前时间作为文件名的一部分，并加上原始扩展名
                callback(null, fileName);
            },
        }),
      })
    }),
    TypeOrmModule.forFeature([
      SysMenuEntity, SysDeptEntity, SysPostEntity, SysDictDataEntity, SysDictTypeEntity, SysConfigEntity, SysRoleEntity, SysRoleMenuEntity,SysUserEntity,
      SysUserPostEntity,SysUserRoleEntity,SysRoleDeptEntity,SysLogininforEntity,SysOperlogEntity,GenTableColumnEntity,GenTableEntity,DemoTestOneEntity
    ])
  ],
  controllers: [SysMenuController, SysDeptController, SysPostController, SysDictTypeController, SysDictDataController, SysConfigController, SysRoleController,SysUserController,
    SysFileController, GenController, DemoTestOneController
  ],
  providers: [
    //service
    ...[
        SysMenuService, SysDeptService, SysPostService, SysDictTypeService, SysDictDataService, SysConfigService, RedisUtil, SysRoleService, SysUserService,
        SysLogininforService,SysOperlogService,GenService,DemoTestOneService
    ],
    //dao
    ...[
      SysMenuDao, SysDeptDao, SysPostDao, SysDictTypeDao, SysDictDataDao, SysConfigDao, SysRoleDao, SysUserDao, SysLogininforDao, SysOperlogDao,DemoTestOneDao
    ]
  ],
  exports: [SysUserService, SysLogininforService,SysOperlogService]
})
export class SystemModule {}