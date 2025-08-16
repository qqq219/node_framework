import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('sys_dict_type', {
  comment: '字典类型表',
})
export class SysDictTypeEntity {

  @PrimaryGeneratedColumn({ type: 'int', name: 'dict_id', comment: '字典主键' })
  public dictId: number;

  @Column({ type: 'varchar', name: 'dict_name', length: 100, comment: '字典名称' })
  public dictName: string;

  @Column({ type: 'varchar', name: 'dict_type', unique: true, length: 100, comment: '字典类型' })
  public dictType: string;

  //0正常 1停用
  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '状态' })
  public status: string;

  @Column({ type: 'varchar', name: 'create_by', length: 64, default: '', comment: '创建者' })
  public createBy: string;

  @Column({ type: 'datetime', name: 'create_time', default: null, comment: '创建时间' })
  public createTime: Date;

  @Column({ type: 'varchar', name: 'update_by', length: 64, default: '', comment: '更新者' })
  public updateBy: string;

  @Column({ type: 'datetime', name: 'update_time', default: null, comment: '更新时间' })
  public updateTime: Date;

  @Column({ type: 'varchar', name: 'remark', length: 500, default: null, comment: '备注' })
  public remark: string;
}
