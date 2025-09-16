
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConvertDate } from "src/common/model/ConvertDate";
import { DateTransformer } from "src/common/conversion/DateTransformer";


@Entity('sys_oper_log', {
    comment: '操作日志记录',
})
export class SysOperLogEntity {
  
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'oper_id', comment: '日志主键' })
  public operId: number;  
            
  @Column({ type: 'varchar', name: 'title', comment: '模块标题'})
  public title: string; 
            
  @Column({ type: 'char', name: 'business_type', comment: '业务类型（0其它 1新增 2修改 3删除）'})
  public businessType: string; 
            
  @Column({ type: 'varchar', name: 'method', comment: '方法名称'})
  public method: string; 
            
  @Column({ type: 'varchar', name: 'request_method', comment: '请求方式'})
  public requestMethod: string; 
            
  @Column({ type: 'char', name: 'operator_type', comment: '操作类别（0其它 1后台用户 2手机端用户）'})
  public operatorType: string; 
            
  @Column({ type: 'varchar', name: 'oper_name', comment: '操作人员'})
  public operName: string; 
            
  @Column({ type: 'varchar', name: 'dept_name', comment: '部门名称'})
  public deptName: string; 
            
  @Column({ type: 'varchar', name: 'oper_url', comment: '请求URL'})
  public operUrl: string; 
            
  @Column({ type: 'varchar', name: 'oper_ip', comment: '主机地址'})
  public operIp: string; 
            
  @Column({ type: 'varchar', name: 'oper_location', comment: '操作地点'})
  public operLocation: string; 
            
  @Column({ type: 'varchar', name: 'oper_param', comment: '请求参数'})
  public operParam: string; 
            
  @Column({ type: 'varchar', name: 'json_result', comment: '返回参数'})
  public jsonResult: string; 
            
  @Column({ type: 'char', name: 'status', comment: '操作状态（0正常 1异常）'})
  public status: string; 
            
  @Column({ type: 'varchar', name: 'error_msg', comment: '错误消息'})
  public errorMsg: string; 
            
  @Column({ type: 'datetime', name: 'oper_time', comment: '操作时间', transformer:new DateTransformer()})
  public operTime: ConvertDate; 
            
  @Column({ type: 'bigint', name: 'cost_time', comment: '消耗时间'})
  public costTime: number; 
            
}
    