import { Injectable } from "@nestjs/common";
import { SysOperLogReq } from "../model/req/SysOperLogReq";
import { SysOperLogDao } from "../dao/SysOperLog.dao";
import { SysOperLogDto } from "../model/dto/SysOperLogDto";
import { ExportTable } from "src/common/utils/export";
@Injectable()
export class SysOperLogService {

    constructor(
      private readonly sysOperLogDao:SysOperLogDao
    ) {
    }
    
    async findList(sysOperLogReq: SysOperLogReq) {
      return await this.sysOperLogDao.selectSysOperLogList(sysOperLogReq);
    }
    
    async create(createSysOperLogDto: SysOperLogDto) {
      return await this.sysOperLogDao.insertSysOperLog(createSysOperLogDto);
    }
    
    async findOne(id: number) {
      return await this.sysOperLogDao.selectSysOperLogById(id);
    }
    
    async update(updateSysOperLogDto: SysOperLogDto) {
      return await this.sysOperLogDao.updateSysOperLog(updateSysOperLogDto);
    }
    
    async remove(idList: number[]) {
      return await this.sysOperLogDao.deleteSysOperLogByIds(idList);
    }

     /**
       * 导出操作日志记录数据为xlsx文件
       * @param res
       * @param req
       */
      async export(res: Response, req: SysOperLogReq) {
        Reflect.deleteProperty(req, "current")
        Reflect.deleteProperty(req, "pageSize")
        const [list] = await this.findList(req);
        const options = {
          sheetName: '操作日志记录',
          data: list,
          header: [
            
      { title: '日志主键', dataIndex: 'operId' },
      { title: '模块标题', dataIndex: 'title' },
      { title: '业务类型（0其它 1新增 2修改 3删除）', dataIndex: 'businessType' },
      { title: '方法名称', dataIndex: 'method' },
      { title: '请求方式', dataIndex: 'requestMethod' },
      { title: '操作类别（0其它 1后台用户 2手机端用户）', dataIndex: 'operatorType' },
      { title: '操作人员', dataIndex: 'operName' },
      { title: '部门名称', dataIndex: 'deptName' },
      { title: '请求URL', dataIndex: 'operUrl' },
      { title: '主机地址', dataIndex: 'operIp' },
      { title: '操作地点', dataIndex: 'operLocation' },
      { title: '请求参数', dataIndex: 'operParam' },
      { title: '返回参数', dataIndex: 'jsonResult' },
      { title: '操作状态（0正常 1异常）', dataIndex: 'status' },
      { title: '错误消息', dataIndex: 'errorMsg' },
      { title: '操作时间', dataIndex: 'operTime' },
      { title: '消耗时间', dataIndex: 'costTime' },
          ],
        };
        await ExportTable(options, res as any);
      }

}