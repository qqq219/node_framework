import { Injectable } from "@nestjs/common";
import { SysLogininforReq } from "../model/req/SysLogininforReq";
import { SysLogininforDao } from "../dao/SysLogininfor.dao";
import { SysLogininforDto } from "../model/dto/SysLogininforDto";
import { ExportTable } from "src/common/utils/export";
@Injectable()
export class SysLogininforService {

    constructor(
      private readonly sysLogininforDao:SysLogininforDao
    ) {
    }
    
    async findList(sysLogininforReq: SysLogininforReq) {
      return await this.sysLogininforDao.selectSysLogininforList(sysLogininforReq);
    }
    
    async create(createSysLogininforDto: SysLogininforDto) {
      return await this.sysLogininforDao.insertSysLogininfor(createSysLogininforDto);
    }
    
    async findOne(id: number) {
      return await this.sysLogininforDao.selectSysLogininforById(id);
    }
    
    async update(updateSysLogininforDto: SysLogininforDto) {
      return await this.sysLogininforDao.updateSysLogininfor(updateSysLogininforDto);
    }
    
    async remove(idList: number[]) {
      return await this.sysLogininforDao.deleteSysLogininforByIds(idList);
    }

     /**
       * 导出系统访问记录数据为xlsx文件
       * @param res
       * @param req
       */
      async export(res: Response, req: SysLogininforReq) {
        Reflect.deleteProperty(req, "current")
        Reflect.deleteProperty(req, "pageSize")
        const [list] = await this.findList(req);
        const options = {
          sheetName: '系统访问记录',
          data: list,
          header: [
            { title: '访问ID', dataIndex: 'infoId' },
            { title: '用户账号', dataIndex: 'userName' },
            { title: '登录IP地址', dataIndex: 'ipaddr' },
            { title: '登录地点', dataIndex: 'loginLocation' },
            { title: '浏览器类型', dataIndex: 'browser' },
            { title: '操作系统', dataIndex: 'os' },
            { title: '登录状态（0成功 1失败）', dataIndex: 'status' },
            { title: '提示消息', dataIndex: 'msg' },
            { title: '访问时间', dataIndex: 'loginTime' },
          ],
        };
        await ExportTable(options, res as any);
      }

}