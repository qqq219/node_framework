import { Injectable } from '@nestjs/common';
import { CacheEnum } from 'src/common/model/enum/CacheEnum';
import { ResultData } from 'src/common/model/ResultData';
import { Paginate } from 'src/common/utils/normal.tool';
import { RedisUtil } from 'src/common/utils/Redis.tool';

@Injectable()
export class SysOnlineService {
  constructor(
    private readonly redisUtil: RedisUtil
  ) {}
  /**
   * 日志列表-分页
   * @param query
   * @returns
   */
  async findAll(query) {
    const kes = await this.redisUtil.keys(`${CacheEnum.LOGIN_TOKEN_KEY}*`);
    const data = await this.redisUtil.mget(kes);
    if(!data){
      return [];
    }
    const list = Paginate(
      {
        list: data,
        pageSize: query.pageSize,
        current: query.current,
      },
      query,
    ).map((item) => {
      return {
        tokenId: item.token,
        deptName: item.user.deptName,
        userName: item.username,
        ipaddr: item.ipaddr,
        loginLocation: item.loginLocation,
        browser: item.browser,
        os: item.os,
        loginTime: item.loginTime,
      };
    });
    return ResultData.list(list,data?.length);
  }

  async delete(token: string) {
    await this.redisUtil.del(`${CacheEnum.LOGIN_TOKEN_KEY}${token}`);
    return ResultData.ok();
  }
}
