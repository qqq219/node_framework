import { Body, Controller, Delete, HttpCode, Post, Request, Get } from "@nestjs/common";
import { LoginDto } from "src/common/model/dto/LoginDto";
import { SysLoginService } from "../service/service/SysLoginService";
import { getRedisUtilBean, RedisUtil } from "src/common/utils/Redis.tool";
import { CacheEnum } from "src/common/model/enum/CacheEnum";
import { ResultData } from "src/common/model/ResultData";
import * as Useragent from 'useragent';
import { GenerateUUID } from "src/common/utils/normal.tool";
import { createMath } from "src/common/utils/captcha";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('登录模块')
@Controller("auth")
export class TokenController {
    constructor(
        private loginService: SysLoginService,
        private readonly redisUtil: RedisUtil
    ) {}
    
    @ApiOperation({
      summary:"登录"
    })
    @ApiBody({
      type: LoginDto,
      required: true,
    })
    @Post('/login')
    @HttpCode(200)
    async login(@Body() user: LoginDto, @Request() req) {

      const code = await this.redisUtil.get(CacheEnum.CAPTCHA_CODE_KEY + user.uuid);
      if (!code) {
        return ResultData.fail(500, `验证码已过期`);
      }
      if (code !== user.code) {
        return ResultData.fail(500, `验证码错误`);
      }
      const agent = Useragent.parse(req.headers['user-agent']);
      const os = agent.os.toJSON().family;
      const browser = agent.toAgent();
      const clientInfo = {
        userAgent: req.headers['user-agent'],
        ipaddr: req.ip,
        browser: browser,
        os: os,
        loginLocation: '',
      };
      return this.loginService.login(user, clientInfo);
    }

  @ApiOperation({
    summary:"退出登录"
  })
  @Delete('/logout')
  @HttpCode(200)
  async logout(@Request() req) {
      const user = req?.user?.user
      const agent = Useragent.parse(req.headers['user-agent']);
      const os = agent.os.toJSON().family;
      const browser = agent.toAgent();
      const clientInfo = {
        userAgent: req.headers['user-agent'],
        ipaddr: req.ip,
        browser: browser,
        os: os,
        loginLocation: '',
        userName:user?.userName
      };
      if (req.user?.token) {
        await this.redisUtil.del(`${CacheEnum.LOGIN_TOKEN_KEY}${req.user.token}`);
      }
      return this.loginService.logout(clientInfo);
  }

  @ApiOperation({
    summary:"获取验证码"
  })
  @Get('/code')
  async captchaImage() {
    //是否开启验证码
    const enable = true;
    const captchaEnabled: boolean = enable === true;
    const data = {
      captchaEnabled,
      img: '',
      uuid: '',
    };
    try {
      if (captchaEnabled) {
        const captchaInfo = createMath();
        const base64String = Buffer.from(captchaInfo.data).toString('base64');
        data.img = base64String;
        data.uuid = GenerateUUID();
   
        await this.redisUtil.set(CacheEnum.CAPTCHA_CODE_KEY + data.uuid, captchaInfo.text.toLowerCase(), 1000 * 60 * 5);
      }
      return ResultData.ok(data, '操作成功');
    } catch (err) {
      return ResultData.fail(500, '生成验证码错误，请重试');
    }
  }


}