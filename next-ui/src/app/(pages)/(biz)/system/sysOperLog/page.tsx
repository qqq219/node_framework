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
import EditSysOperLog from './edit';
import { addSysOperLog, exportSysOperLog, getSysOperLogList, removeSysOperLog, updateSysOperLog } from '@/app/services/system/sysOperLog';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.SysOperLog) => {
  const hide = message.loading('loading...');
  try {
    await updateSysOperLog(fields);
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
const handleRemove = async (selectedRows: API.System.SysOperLog[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeSysOperLog(selectedRows.map((row) => row.operId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.SysOperLog) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.operId];
    await removeSysOperLog(params.join(','));
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
    await exportSysOperLog();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function SysOperLogPage() {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [sysOperLogList, setSysOperLogList] = useState<API.System.SysOperLog[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.SysOperLog>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.SysOperLog[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        updateSysOperLogList(page, pageSize);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.SysOperLog) => {
        try {
            await addSysOperLog(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateSysOperLogList = async (current:number, pageSize:number) => {
        setLoading(true);
        try{
            const sysOperLogListParams:API.System.SysOperLogListParams = paramsForm.getFieldsValue();
            sysOperLogListParams.current = current as unknown as string;
            sysOperLogListParams.pageSize = String(pageSize);
            const res = await getSysOperLogList(sysOperLogListParams);
            const listData:API.System.SysOperLog[] = res.data.rows as API.System.SysOperLog[]
            setSysOperLogList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateSysOperLogList(1, pageSize);
    }

    useEffect(() => {
        updateSysOperLogList(1, pageSize);
    }, []);

    const rowSelection: TableRowSelection<API.System.SysOperLog> = {
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

    const onFinish: FormProps<API.System.SysOperLogListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateSysOperLogList(currentPage, pageSize)
    };

    const onFinishFailed: FormProps<API.System.SysOperLogListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.SysOperLog> = [
    
      {
        title:"模块标题",
        dataIndex: 'title',
        key: 'title',
      },
        
      {
        title:"业务类型",
        dataIndex: 'businessType',
        key: 'businessType',
        render: (_, record) => {
            return ( <Tag >{record.businessType == "0"?"其他":record.businessType == "1"?"新增":record.businessType == "2"?"修改":"删除"}</Tag>);
        },
      },
        
      {
        title:"方法名称",
        dataIndex: 'method',
        key: 'method',
      },
        
      {
        title:"请求方式",
        dataIndex: 'requestMethod',
        key: 'requestMethod',
      },
        
      {
        title:"操作类别",
        dataIndex: 'operatorType',
        key: 'operatorType',
        render: (_, record) => {
            return ( <Tag >{record.operatorType == "0"?"其他":record.operatorType == "1"?"后台用户":"手机端用户"}</Tag>);
        },
      },
        
      {
        title:"操作人员",
        dataIndex: 'operName',
        key: 'operName',
      },
        
      {
        title:"部门名称",
        dataIndex: 'deptName',
        key: 'deptName',
      },
        
      {
        title:"请求URL",
        dataIndex: 'operUrl',
        key: 'operUrl',
      },
        
      {
        title:"主机地址",
        dataIndex: 'operIp',
        key: 'operIp',
      },
        
      {
        title:"操作地点",
        dataIndex: 'operLocation',
        key: 'operLocation',
      },
        
      {
        title:"请求参数",
        dataIndex: 'operParam',
        key: 'operParam',
      },
        
      {
        title:"返回参数",
        dataIndex: 'jsonResult',
        key: 'jsonResult',
      },
        
      {
        title:"操作状态",
        dataIndex: 'status',
        key: 'status',
         render: (_, record) => {
            return ( <Tag color={record.status == "0"?"blue":"red"}>{record.status == "0"?"正常":"关闭"}</Tag>);
        },
      },
        
      {
        title:"错误消息",
        dataIndex: 'errorMsg',
        key: 'errorMsg',
      },
        
      {
        title:"操作时间",
        dataIndex: 'operTime',
        key: 'operTime',
      },
        
      {
        title:"消耗时间",
        dataIndex: 'costTime',
        key: 'costTime',
      },
        
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
        <div>
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
                            updateSysOperLogList(1, pageSize);
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
                        
                        <Form.Item<API.System.SysOperLog>
                            label="模块标题"
                            name="title"
                            rules={[{ required: false, message: '请输入模块标题' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="方法名称"
                            name="method"
                            rules={[{ required: false, message: '请输入方法名称' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="操作人员"
                            name="operName"
                            rules={[{ required: false, message: '请输入操作人员' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="请求URL"
                            name="operUrl"
                            rules={[{ required: false, message: '请输入请求URL' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="主机地址"
                            name="operIp"
                            rules={[{ required: false, message: '请输入主机地址' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="操作地点"
                            name="operLocation"
                            rules={[{ required: false, message: '请输入操作地点' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="请求参数"
                            name="operParam"
                            rules={[{ required: false, message: '请输入请求参数' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.System.SysOperLog>
                            label="返回参数"
                            name="jsonResult"
                            rules={[{ required: false, message: '请输入返回参数' }]}>
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
                        <span className='text-1xl font-bold'>操作日志记录</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
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
                                                updateSysOperLogList(currentPage, pageSize);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateSysOperLogList(currentPage, pageSize)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.SysOperLog>
                            rowSelection={rowSelection}
                            dataSource={sysOperLogList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="operId"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditSysOperLog
                onSubmit={async (values) => {
                    let success = false;
                    if (values.operId) {
                        success = await handleUpdate({ ...values } as API.System.SysOperLog);
                    } else {
                        success = await handleAdd({ ...values } as API.System.SysOperLog);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateSysOperLogList(currentPage, pageSize);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible} sysOperLogList={[]}            >
            </EditSysOperLog>
     </div>
    );
}
    