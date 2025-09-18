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
import EditSysLogininfor from './edit';
import { addSysLogininfor, exportSysLogininfor, getSysLogininforList, removeSysLogininfor, updateSysLogininfor } from '@/app/services/system/sysLogininfor';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.SysLogininfor) => {
  const hide = message.loading('loading...');
  try {
    await updateSysLogininfor(fields);
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
const handleRemove = async (selectedRows: API.System.SysLogininfor[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeSysLogininfor(selectedRows.map((row) => row.infoId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.SysLogininfor) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.infoId];
    await removeSysLogininfor(params.join(','));
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
    await exportSysLogininfor();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function SysLogininforPage() {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [sysLogininforList, setSysLogininforList] = useState<API.System.SysLogininfor[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.SysLogininfor>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.SysLogininfor[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        setPageSize(pageSize)
        updateSysLogininforList(page, pageSize);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.SysLogininfor) => {
        try {
            await addSysLogininfor(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateSysLogininforList = async (current:number, pageSize:number) => {
        setLoading(true);
        try{
            const sysLogininforListParams:API.System.SysLogininforListParams = paramsForm.getFieldsValue();
            sysLogininforListParams.current = String(current);
            sysLogininforListParams.pageSize = String(pageSize);
            const res = await getSysLogininforList(sysLogininforListParams);
            const listData:API.System.SysLogininfor[] = res.data.rows as API.System.SysLogininfor[]
            setSysLogininforList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateSysLogininforList(1, pageSize);
    }

    useEffect(() => {
        updateSysLogininforList(1, pageSize);
    }, []);

    const rowSelection: TableRowSelection<API.System.SysLogininfor> = {
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

    const onFinish: FormProps<API.System.SysLogininforListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateSysLogininforList(currentPage, pageSize)
    };

    const onFinishFailed: FormProps<API.System.SysLogininforListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.SysLogininfor> = [
    
      {
        title:"用户账号",
        dataIndex: 'userName',
        key: 'userName',
      },
        
      {
        title:"登录IP地址",
        dataIndex: 'ipaddr',
        key: 'ipaddr',
      },
        
      {
        title:"登录地点",
        dataIndex: 'loginLocation',
        key: 'loginLocation',
      },
        
      {
        title:"浏览器类型",
        dataIndex: 'browser',
        key: 'browser',
      },
        
      {
        title:"操作系统",
        dataIndex: 'os',
        key: 'os',
      },
        
      {
        title:"登录状态",
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            return ( <Tag color={record.status == "0"?"blue":"red"}>{record.status == "0"?"正常":"关闭"}</Tag>);
        },
      },
        
      {
        title:"提示消息",
        dataIndex: 'msg',
        key: 'msg',
      },
        
      {
        title:"访问时间",
        dataIndex: 'loginTime',
        key: 'loginTime',
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
                hidden={!access(userInfo).hasPerms('system:sysLogininfor:edit')}
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
                            updateSysLogininforList(1, pageSize);
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
                        
      <Form.Item<API.System.SysLogininfor>
          label="用户账号"
          name="userName"
          rules={[{ required: false, message: '请输入用户账号' }]}>
          <Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.SysLogininfor>
          label="登录IP地址"
          name="ipaddr"
          rules={[{ required: false, message: '请输入登录IP地址' }]}>
          <Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.SysLogininfor>
          label="登录地点"
          name="loginLocation"
          rules={[{ required: false, message: '请输入登录地点' }]}>
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
                        <span className='text-1xl font-bold'>系统访问记录</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button 
                              type="primary" 
                              className='w-button-primary' 
                              onClick={addBtnOnClick}
                              hidden={!access(userInfo).hasPerms('system:sysLogininfor:add')}>
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
                                                updateSysLogininforList(currentPage, pageSize);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateSysLogininforList(currentPage, pageSize)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.SysLogininfor>
                            rowSelection={rowSelection}
                            dataSource={sysLogininforList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="infoId"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditSysLogininfor
                onSubmit={async (values) => {
                    let success = false;
                    if (values.infoId) {
                        success = await handleUpdate({ ...values } as API.System.SysLogininfor);
                    } else {
                        success = await handleAdd({ ...values } as API.System.SysLogininfor);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateSysLogininforList(currentPage, pageSize);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible} sysLogininforList={[]}            >
            </EditSysLogininfor>
     </div>
    );
}
    