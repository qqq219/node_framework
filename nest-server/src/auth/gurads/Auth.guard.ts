import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { pathToRegexp ,match} from 'path-to-regexp';
import { ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenUtil } from 'src/common/utils/TokenUtils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private globalWhiteList = [];
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenUtil:TokenUtil,
    private readonly config:ConfigService,
  ) {
    super();
    this.globalWhiteList = [].concat(config.get('perm.router.whitelist') || []);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isInWhiteList = this.checkWhiteList(ctx);
    if (isInWhiteList) {
      return true;
    }
    const req = ctx.switchToHttp().getRequest();
    const accessToken = req.get('Authorization');
    if (!accessToken) throw new ForbiddenException('请重新登录');
    const atUserId = await this.tokenUtil.parseToken(accessToken);
    if (!atUserId) throw new UnauthorizedException('当前登录已过期，请重新登录');
    return await this.activate(ctx);
  }

  async activate(ctx: ExecutionContext): Promise<boolean> {
    return super.canActivate(ctx) as Promise<boolean>;
  }

  /**
   * 检查接口是否在白名单内
   * @param ctx
   * @returns
   */
  checkWhiteList(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const i = this.globalWhiteList.findIndex((route:any) => {
      // 请求方法类型相同
      if (req.method.toUpperCase() === route.method.toUpperCase()) {
        // 对比 url
        //@ts-ignore
        const regexp = pathToRegexp(route.path)
        return regexp.regexp.exec(req.url);
      }
      return false;
    });
    // 在白名单内 则 进行下一步， i === -1 ，则不在白名单，需要 比对是否有当前接口权限
    return i > -1;
  }
}
