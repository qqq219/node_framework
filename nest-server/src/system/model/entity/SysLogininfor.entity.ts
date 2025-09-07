import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('sys_logininfor', {
  comment: '系统访问记录',
})
export class SysLogininforEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'info_id', comment: '访问ID' })
  public infoId: string;

  @Column({ type: 'varchar', name: 'user_name', length: 50, default: '', comment: '用户账号' })
  public userName: string;

  @Column({ type: 'varchar', name: 'ipaddr', length: 128, default: '', comment: '登录IP地址' })
  public ipaddr: string;

  @Column({ type: 'varchar', name: 'login_location', length: 255, default: '', comment: '登录地点' })
  public loginLocation: string;

  @Column({ type: 'varchar', name: 'browser', length: 50, default: '', comment: '浏览器类型' })
  public browser: string;

  @Column({ type: 'varchar', name: 'os', length: 50, default: '', comment: '操作系统' })
  public os: string;

  @CreateDateColumn({ type: 'timestamp', name: 'login_time', comment: '访问时间' })
  public loginTime: Date;

  //提示消息
  @Column({ type: 'varchar', name: 'msg', length: 255, default: '', comment: '提示消息' })
  public msg: string;

  //0正常 1停用
  @ApiProperty({ type: String, description: '状态' })
  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '状态' })
  public status: string;

}
