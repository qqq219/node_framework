

/**
 * @author zhanjian
 */

'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import EditDemoTestOne from './edit';
import { addDemoTestOne, exportDemoTestOne, getDemoTestOneList, removeDemoTestOne, updateDemoTestOne } from '@/app/services/demoTestOne';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.DemoTestOne) => {
  const hide = message.loading('loading...');
  try {
    await updateDemoTestOne(fields);
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
const handleRemove = async (selectedRows: API.System.DemoTestOne[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeDemoTestOne(selectedRows.map((row) => row.demoTestOneId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.DemoTestOne) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.demoTestOneId];
    await removeDemoTestOne(params.join(','));
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
    await exportDemoTestOne();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function DemoTestOnePage() {

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [demoTestOneList, setDemoTestOneList] = useState<API.System.DemoTestOne[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.DemoTestOne>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.DemoTestOne[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        updateDemoTestOneList(page);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.DemoTestOne) => {
        try {
            await addDemoTestOne(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateDemoTestOneList = async (current:number) => {
        setLoading(true);
        try{
            const demoTestOneListParams:API.System.DemoTestOneListParams = paramsForm.getFieldsValue();
            demoTestOneListParams.current = current as unknown as string;
            demoTestOneListParams.pageSize = "10";
            const res = await getDemoTestOneList(demoTestOneListParams);
            const listData:API.System.DemoTestOne[] = res.data.rows as API.System.DemoTestOne[]
            setDemoTestOneList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateDemoTestOneList(1);
    }

    useEffect(() => {
        updateDemoTestOneList(1);
    }, []);

    const rowSelection: TableRowSelection<API.System.DemoTestOne> = {
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

    const onFinish: FormProps<API.System.DemoTestOneListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateDemoTestOneList(currentPage)
    };

    const onFinishFailed: FormProps<API.System.DemoTestOneListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.DemoTestOne> = [
    
      {
        title:"测试名",
        dataIndex: 'testName',
        key: 'testName',
      },
        
      {
        title:"测试类型",
        dataIndex: 'testType',
        key: 'testType',
      },
        
      {
        title:"状态",
        dataIndex: 'status',
        key: 'status',
      },
        
      {
        title:"测试内容",
        dataIndex: 'testContent',
        key: 'testContent',
      },
        
      {
        title:"生效时间",
        dataIndex: 'startDate',
        key: 'startDate',
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
                hidden={!access.hasPerms('system:demoTestOne:edit')}
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
                    hidden={!access.hasPerms('system:demoTestOne:delete')}
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        const success = await handleRemoveOne(record);
                        if (success) {
                            updateDemoTestOneList(1);
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
                        
      <Form.Item<API.System.DemoTestOne>
          label="测试名"
          name="test_name"
          rules={[{ required: true, message: '请输入测试名' }]}>
          <Input className='!w-64' allowClear/><Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.DemoTestOne>
          label="测试类型"
          name="test_type"
          rules={[{ required: true, message: '请输入测试类型' }]}>
          <Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.DemoTestOne>
          label="状态"
          name="status"
          rules={[{ required: true, message: '请输入状态' }]}>
          <Input className='!w-64' allowClear/><Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.DemoTestOne>
          label="测试内容"
          name="test_content"
          rules={[{ required: true, message: '请输入测试内容' }]}>
          <Input className='!w-64' allowClear/><Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.DemoTestOne>
          label="生效时间"
          name="start_date"
          rules={[{ required: true, message: '请输入生效时间' }]}>
          <Input className='!w-64' allowClear/><Input className='!w-64' allowClear/>
      </Form.Item>
        
      <Form.Item<API.System.DemoTestOne>
          label="备注"
          name="remark"
          rules={[{ required: true, message: '请输入备注' }]}>
          <Input className='!w-64' allowClear/><Input className='!w-64' allowClear/>
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
                        <span className='text-1xl font-bold'>岗位列表</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button 
                              type="primary" 
                              className='w-button-primary' 
                              onClick={addBtnOnClick}>
                              hidden={!access.hasPerms('system:demoTestOne:add')}
                              + 新建
                            </Button>
                            <Button
                                type="primary"
                                key="remove"
                                hidden={selectedRows?.length === 0 ..........}
                                onClick={async () => {
                                    Modal.confirm({
                                        title: '是否确认删除所选数据项?',
                                        icon: <ExclamationCircleOutlined />,
                                        content: '请谨慎操作!',
                                        async onOk() {
                                            const success = await handleRemove(selectedRows);
                                            if (success) {
                                                setSelectedRows([]);
                                                updateDemoTestOneList(currentPage);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateDemoTestOneList(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.DemoTestOne>
                            rowSelection={rowSelection}
                            dataSource={demoTestOneList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="demoTestOneId"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditDemoTestOne
                onSubmit={async (values) => {
                    let success = false;
                    if (values.demoTestOneId) {
                        success = await handleUpdate({ ...values } as API.System.DemoTestOne);
                    } else {
                        success = await handleAdd({ ...values } as API.System.DemoTestOne);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateDemoTestOneList(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible} demoTestOneList={[]}            >
            </EditDemoTestOne>
     </div>
    );
}
    