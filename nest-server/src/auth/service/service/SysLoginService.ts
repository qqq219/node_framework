import { Injectable, HttpException, Logger } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { ClientInfoDto } from "src/common/model/dto/ClientInfoDto";
import { LoginDto } from "src/common/model/dto/LoginDto";
import { CacheEnum } from "src/common/model/enum/CacheEnum";
import { DelFlagEnum } from "src/common/model/enum/DelFlagEnum";
import { StatusEnum } from "src/common/model/enum/StatusEnum";
import { ResultData } from "src/common/model/ResultData";
import { GenerateUUID } from "src/common/utils/normal.tool";
import { RedisUtil } from "src/common/utils/Redis.tool";
import { SysUserService } from "src/system/service/SysUser.service";
import { ConfigService } from '@nestjs/config';
import { TokenUtil } from "src/common/utils/TokenUtils";
import { SysLogininforService } from "src/system/service/SysLogininfor.service";

@Injectable()
export class SysLoginService {
  private readonly logger = new Logger(SysLoginService.name)

  constructor(
    private readonly sysUserService: SysUserService,
    private readonly redisUtil: RedisUtil,
    private readonly tokenUtil: TokenUtil,
    private readonly logininforService: SysLogininforService,
    private readonly config : ConfigService
  ) {
  }

  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    const loginLog = {
      ...clientInfo,
      userName: user.username,
      status: "0",
      msg: "Login success",
      loginTime:new Date(),
    };
    try {
      loginLog.loginLocation = "loginLocation todo";
    } catch (error) {
    }
    const userEntity = await this.sysUserService.getUserByUsername(user.username);
    if (userEntity === null) {
      throw new HttpException("用户不存在",520);
    }
    //校验密码
    if (!bcrypt.compareSync(user.password, userEntity.password)) {
      throw new HttpException("密码不正确",510);
    }
    const userData = await this.sysUserService.getUserinfo(userEntity.userId);

    if (userData.delFlag === DelFlagEnum.DELETE) {
      return ResultData.fail(500, `您已被禁用，如需正常使用请联系管理员`);
    }
    if (userData.status === StatusEnum.STOP) {
      return ResultData.fail(500, `您已被停用，如需正常使用请联系管理员`);
    }
    const loginDate = new Date();
    await this.sysUserService.updateLoginDate(userEntity.userId,loginDate)
    const uuid = GenerateUUID();
    const token = this.tokenUtil.createToken({ user_key: uuid, user_id: userEntity.userId, username: user.username});


    const permissions = await this.sysUserService.getUserPermissions(userData.userId);
    const roles = userData.roles.map((item) => item.roleKey);

    if(process.env.NODE_ENV==="development"){
      userData["permissions"] = permissions
    }

    let metaData = {
      browser: clientInfo.browser,
      ipaddr: clientInfo.ipaddr,
      loginLocation: clientInfo.loginLocation,
      loginTime: loginDate,
      os: clientInfo.os,
      permissions: permissions,
      roles: roles,
      token: uuid,
      user: userData,
      userId: userData.userId,
      username: userData.userName,
      deptId: userData.deptId,
    }
    await this.redisUtil.set(`${CacheEnum.LOGIN_TOKEN_KEY}${uuid}`,metaData ,this.config.get("jwt.expiresIn"));
    this.logininforService.create(loginLog).catch(err=>this.logger.error(err));

    return ResultData.ok({
      access_token:token,
      expires_in: this.config.get("jwt.expiresIn")
    });
  }

  logout(clientInfo: { os: string; browser: string; ipaddr: any; loginLocation: string, userName:string}) {
    const loginLog = {
      ...clientInfo,
      status: '0',
      msg: 'Logout success',
      loginTime: new Date(),
    };
    this.logininforService.create(loginLog).catch(err=>this.logger.error(err));

    return ResultData.ok();

  }
}