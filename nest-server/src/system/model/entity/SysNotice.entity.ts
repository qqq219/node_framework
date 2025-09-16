
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConvertDate } from "src/common/model/ConvertDate";
import { DateTransformer } from "src/common/conversion/DateTransformer";


@Entity('sys_notice', {
    comment: '通知公告表',
})
export class SysNoticeEntity {
  
  @PrimaryGeneratedColumn({ type: 'int', name: 'notice_id', comment: '公告ID' })
  public noticeId: number;  
            
  @Column({ type: 'varchar', name: 'notice_title', comment: '公告标题'})
  public noticeTitle: string; 
            
  @Column({ type: 'char', name: 'notice_type', comment: '公告类型（1通知 2公告）'})
  public noticeType: string; 
            
  @Column({ type: 'text', name: 'notice_content', comment: '公告内容'})
  public noticeContent: string; 
            
  @Column({ type: 'char', name: 'status', comment: '公告状态（0正常 1关闭）'})
  public status: string; 
            
  @Column({ type: 'varchar', name: 'remark', comment: '备注'})
  public remark: string; 
            
  @Column({ type: 'varchar', name: 'create_by', comment: '创建者'})
  public createBy: string; 
            
  @Column({ type: 'datetime', name: 'create_time', comment: '创建时间', transformer:new DateTransformer()})
  public createTime: ConvertDate; 
            
  @Column({ type: 'varchar', name: 'update_by', comment: '更新者'})
  public updateBy: string; 
            
  @Column({ type: 'datetime', name: 'update_time', comment: '更新时间', transformer:new DateTransformer()})
  public updateTime: ConvertDate; 
            
}
    