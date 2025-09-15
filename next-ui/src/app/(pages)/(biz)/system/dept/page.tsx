'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import { buildTreeData } from '@/app/common/utils/tree';
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import { addDept, exportDept, getDeptList, removeDept, updateDept } from '@/app/services/system/dept';
import EditDept from './edit';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.Dept) => {
  const hide = message.loading('loading...');
  try {
    await updateDept(fields);
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
const handleRemove = async (selectedRows: API.System.Dept[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeDept(selectedRows.map((row) => row.deptId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.Dept) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.deptId];
    await removeDept(params.join(','));
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
    await exportDept();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function DeptPage() {

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [deptTree, setDeptTree] = useState<API.System.Dept[]>([]);

    const [currentRow, setCurrentRow] = useState<API.System.Dept>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.Dept[]>([]);

        /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.Dept) => {
        try {
            await addDept(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateDeptTree = async () => {
        setLoading(true);
        try{
            const res = await getDeptList(paramsForm.getFieldsValue());
            const treeData:API.System.Dept[] = res.data.data as API.System.Dept[]
            const memuData = buildTreeData(treeData, 'deptId', 'deptName', '', '', '');
            setDeptTree(memuData);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateDeptTree();
    }

    useEffect(() => {
        updateDeptTree();
    }, []);

    const rowSelection: TableRowSelection<API.System.Dept> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    const addMenuBtnOnClick = ()=>{
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.System.DeptListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateDeptTree()
    };

    const onFinishFailed: FormProps<API.System.DeptListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.Dept> = [
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
    },
    {
        title: '显示排序',
        dataIndex: 'orderNum',
        key: 'orderNum',
    },
    {
        title: '部门状态',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            return ( <Tag color={record.status == "0"?"blue":"red"}>{record.status == "0"?"正常":"停用"}</Tag>);
        },
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
                            updateDeptTree();
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
                        className='w-full flex !p-0'>
                        <Form.Item<API.System.Dept>
                            label="部门名称"
                            name="deptName"
                            rules={[{ required: false, message: '请输入部门名称' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.Dept>
                            label="显示顺序"
                            name="orderNum"
                            rules={[{ required: false, message: '请输入显示顺序' }]}>
                            <Input className='!w-64' allowClear type='number'/>
                        </Form.Item>
                        <Form.Item<API.System.Dept>
                            label="部门状态"
                            name="status"
                            rules={[{ required: false, message: '请输入部门状态' }]}>
                            <Select
                                options={[
                                    { value: '0', label: '正常' },
                                    { value: '1', label: '停用' }
                                ]}
                                className='!w-64'
                                allowClear/>
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
                        <span className='text-1xl font-bold'>部门列表</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button type="primary" className='w-button-primary' onClick={addMenuBtnOnClick}>+ 新建</Button>
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
                                                updateDeptTree();
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateDeptTree()}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.Dept>
                            rowSelection={{ ...rowSelection }}
                            dataSource={deptTree}
                            columns={columns}
                            loading={loading}
                            pagination={false}
                            sticky={true}
                        />
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditDept
                onSubmit={async (values) => {
                    let success = false;
                    if (values.menuId) {
                        success = await handleUpdate({ ...values } as API.System.Dept);
                    } else {
                        success = await handleAdd({ ...values } as API.System.Dept);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateDeptTree();
                        }, 100);
                    }
                    }}
                    onCancel={() => {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                    }}
                values={currentRow || {}}
                open={editDialogVisible}
                deptTree={deptTree}
            >
            </EditDept>
     </div>
    );
}