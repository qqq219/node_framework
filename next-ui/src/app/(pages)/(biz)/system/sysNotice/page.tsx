/**
 * @author zhanjian
 */

'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';
import EditSysNotice from './edit';
import { addSysNotice, exportSysNotice, getSysNoticeList, removeSysNotice, updateSysNotice } from '@/app/services/system/sysNotice';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.SysNotice) => {
  const hide = message.loading('loading...');
  try {
    await updateSysNotice(fields);
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.System.SysNotice[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeSysNotice(selectedRows.map((row) => row.noticeId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.SysNotice) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.noticeId];
    await removeSysNotice(params.join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

/**
 * 导出数据
 *
 *
 */
const handleExport = async () => {
  const hide = message.loading('loading...');
  try {
    await exportSysNotice();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function SysNoticePage() {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [sysNoticeList, setSysNoticeList] = useState<API.System.SysNotice[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.SysNotice>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.SysNotice[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        updateSysNoticeList(page);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.SysNotice) => {
        try {
            await addSysNotice(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateSysNoticeList = async (current:number) => {
        setLoading(true);
        try{
            const sysNoticeListParams:API.System.SysNoticeListParams = paramsForm.getFieldsValue();
            sysNoticeListParams.current = String(current);
            sysNoticeListParams.pageSize = String(pageSize);
            const res = await getSysNoticeList(sysNoticeListParams);
            const listData:API.System.SysNotice[] = res.data.rows as API.System.SysNotice[]
            setSysNoticeList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateSysNoticeList(1);
    }

    useEffect(() => {
        updateSysNoticeList(1);
    }, []);

    const rowSelection: TableRowSelection<API.System.SysNotice> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
            setSelectedRows(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
            setSelectedRows(selectedRows);
        },
    };

    const addBtnOnClick = ()=>{
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.System.SysNoticeListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateSysNoticeList(currentPage)
    };

    const onFinishFailed: FormProps<API.System.SysNoticeListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.SysNotice> = [
    
      {
        title:"公告标题",
        dataIndex: 'noticeTitle',
        key: 'noticeTitle',
      },
        
      {
        title:"公告类型",
        dataIndex: 'noticeType',
        key: 'noticeType',
        render: (_, record) => {
            return ( <Tag>{record.status == "1"?"通知":"公告"}</Tag>);
        },
      },
        
      {
        title:"公告内容",
        dataIndex: 'noticeContent',
        key: 'noticeContent',
      },
        
      {
        title:"公告状态",
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            return ( <Tag color={record.status == "0"?"blue":"red"}>{record.status == "0"?"正常":"关闭"}</Tag>);
        },
      },
        
      {
        title:"备注",
        dataIndex: 'remark',
        key: 'remark',
      },
        
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
        <div>
            <Button
                type="link"
                size="small"
                key="edit"
                hidden={!access(userInfo).hasPerms('system:sysNotice:edit')}
                onClick={() => {
                    setEditDialogVisible(true);
                    setCurrentRow(record);  
            }}
            >
            编辑
            </Button>
            <Button
                type="link"
                size="small"
                danger
                key="batchRemove"
                onClick={async () => {
                    Modal.confirm({
                    title: '删除',
                    content: '确定删除该项吗',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        const success = await handleRemoveOne(record);
                        if (success) {
                            updateSysNoticeList(1);
                        }
                    },
                    });
                }}
                >
            删除
            </Button>
        </div>
        ),
    },
    ];

    return (
        <div className='w-full h-full flex flex-col items-center'>
            {/*条件筛选栏 */}
            <div className="mt-5 w-full flex p-6 rounded-md" style={{border:"var(--border-primary)"}}>
                <div className="w-full">
                    <Form
                        form={paramsForm}
                        name="paramsForm"
                        layout="inline"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='w-full flex !p-0 flex-row gap-3'>
                        
                        <Form.Item<API.System.SysNotice>
                            label="公告标题"
                            name="noticeTitle"
                            rules={[{ required: false, message: '请输入公告标题' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysNotice>
                            label="公告内容"
                            name="noticeContent"
                            rules={[{ required: false, message: '请输入公告内容' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
        
        
                        <div className='flex-1 flex justify-start'>
                            <Button className='w-button-primary' onClick={resetFormParams}>重置</Button>
                            <Button type="primary" className='ml-5 w-button-primary' htmlType="submit">查询</Button>
                        </div> 
                    </Form>
                </div>
            </div>
            {/*表格栏 */}
            <div className="mt-6 flex-1 w-full rounded-md p-5 h-0" style={{border:"var(--border-primary)"}}>
                <div className="h-full w-full flex flex-col">
                    <div className='w-full h-10 flex flex-row items-center pr-5'>
                        <span className='text-1xl font-bold'>通知公告表</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button 
                              type="primary" 
                              className='w-button-primary' 
                              onClick={addBtnOnClick}
                              hidden={!access(userInfo).hasPerms('system:sysNotice:add')}>
                              + 新建
                            </Button>
                            <Button
                                type="primary"
                                key="remove"
                                hidden={selectedRows?.length === 0}
                                onClick={async () => {
                                    Modal.confirm({
                                        title: '是否确认删除所选数据项?',
                                        icon: <ExclamationCircleOutlined />,
                                        content: '请谨慎操作!',
                                        async onOk() {
                                            const success = await handleRemove(selectedRows);
                                            if (success) {
                                                setSelectedRows([]);
                                                updateSysNoticeList(currentPage);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateSysNoticeList(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.SysNotice>
                            rowSelection={rowSelection}
                            dataSource={sysNoticeList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="noticeId"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditSysNotice
                onSubmit={async (values) => {
                    let success = false;
                    if (values.noticeId) {
                        success = await handleUpdate({ ...values } as API.System.SysNotice);
                    } else {
                        success = await handleAdd({ ...values } as API.System.SysNotice);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateSysNoticeList(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible} sysNoticeList={[]}            >
            </EditSysNotice>
     </div>
    );
}
    