import { Injectable, BadRequestException } from '@nestjs/common';
import { SysConfigReq } from "../model/req/SysConfigReq";
import { SysConfigDto } from "../model/dto/SysConfigDto";
import { SysConfigDao } from "../dao/SysConfig.dao";
import { ResultData } from 'src/common/model/ResultData';
import { RedisUtil } from 'src/common/utils/Redis.tool';
import { ExportTable } from 'src/common/utils/export';
import { SysConfigEntity } from '../model/entity/SysConfig.entity';

@Injectable()
export class SysConfigService {

  constructor(
    private readonly redisUtil:RedisUtil,
    private readonly sysConfigDao:SysConfigDao,
  ) {}

  async queryList(query: SysConfigReq) {
    const [list, total] = await this.sysConfigDao.selectConfigList(query);
    return {
      rows:list,
      total,
      code:200,
      msg:"success"
    };
  }

  async create(createConfigDto: SysConfigDto) {
    await this.sysConfigDao.insertConfig(createConfigDto);
    return ResultData.ok();
  }

  async findOne(configId: number) {
    const data = await this.sysConfigDao.selectConfigById(configId);
    return ResultData.ok(data);
  }

  async update(updateConfigDto: SysConfigDto) {
    await this.sysConfigDao.updateConfig(updateConfigDto)
    return ResultData.ok();
  }

  async remove(configIds: number[]) {
    const list = await this.sysConfigDao.selectConfigListByIds(configIds)
    const item = list.find((item) => item.configType === 'Y');
    if (item) {
      return ResultData.fail(500, `内置参数【${item.configKey}】不能删除`);
    }
    const data = await this.sysConfigDao.deleteConfigByIds(configIds)
    return ResultData.ok(data);
  }


  /**
   * Refresh the system configuration cache
   */
  async resetConfigCache() {
    await this.clearConfigCache();
    await this.loadingConfigCache();
    return ResultData.ok();
  }

  /**
   * Delete the system configuration cache
   */
  async clearConfigCache() {
    // const keys = await this.redisUtil.keys(`${CacheEnum.SYS_CONFIG_KEY}*`);
    // if (keys && keys.length > 0) {
    //   await this.redisUtil.del(keys);
    // }
  }
  /**
   * Load the system configuration cache
   */
  async loadingConfigCache() {
    const list = await this.sysConfigDao.selectConfigAll()
    list.forEach((item) => {
    });
  }

  /**
     * 导出参数配置数据为xlsx文件
     * @param res
     * @param req
     */
    async export(res: Response, req: SysConfigReq) {
      Reflect.deleteProperty(req, "current")
      Reflect.deleteProperty(req, "pageSize")
      const list = await this.queryList(req);
      const options = {
        sheetName: '参数配置',
        data: list.rows as SysConfigEntity[],
        header: [
          { title: '参数名称', dataIndex: 'configName' },
          { title: '参数键名', dataIndex: 'configKey' },
          { title: '参数键值', dataIndex: 'configValue' },
          { title: '系统内置', dataIndex: 'configType' },
          { title: '备注', dataIndex: 'remark' },
        ],
      };
      await ExportTable(options, res as any);
    }

}
