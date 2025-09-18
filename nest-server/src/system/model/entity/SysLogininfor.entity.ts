
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConvertDate } from "src/common/model/ConvertDate";
import { DateTransformer } from "src/common/conversion/DateTransformer";


@Entity('sys_logininfor', {
    comment: '系统访问记录',
})
export class SysLogininforEntity {
  
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'info_id', comment: '访问ID' })
  public infoId: number;  
            
  @Column({ type: 'varchar', name: 'user_name', comment: '用户账号'})
  public userName: string; 
            
  @Column({ type: 'varchar', name: 'ipaddr', comment: '登录IP地址'})
  public ipaddr: string; 
            
  @Column({ type: 'varchar', name: 'login_location', comment: '登录地点'})
  public loginLocation: string; 
            
  @Column({ type: 'varchar', name: 'browser', comment: '浏览器类型'})
  public browser: string; 
            
  @Column({ type: 'varchar', name: 'os', comment: '操作系统'})
  public os: string; 
            
  @Column({ type: 'char', name: 'status', comment: '登录状态（0成功 1失败）'})
  public status: string; 
            
  @Column({ type: 'varchar', name: 'msg', comment: '提示消息'})
  public msg: string; 
            
  @Column({ type: 'datetime', name: 'login_time', comment: '访问时间', transformer:new DateTransformer()})
  public loginTime: ConvertDate; 
            
}
    