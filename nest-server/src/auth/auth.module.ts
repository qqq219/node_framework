import {  Module } from '@nestjs/common';
import { TokenController } from './controller/TokenController';
import { SysLoginService } from './service/service/SysLoginService';
import { SystemModule } from 'src/system/system.module';
import { CommonModule } from 'src/common/common.module';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './gurads/Auth.guard';
import { RoleGuard } from './gurads/Role.guard';
import { PermissionGuard } from './gurads/Permission.guard';

@Module({
  imports: [ 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SystemModule, 
    CommonModule,
    JwtModule.registerAsync({
        inject:[ConfigService],
        imports:[],
        useFactory: async (config:ConfigService) => ({
          secret: config.get('jwt.secretkey')
        }),
      }),],
  controllers: [TokenController],
  providers: [SysLoginService, AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports:[SysLoginService]
})

export class AuthModule {}
