'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import EditRole from './edit';
import { addRole, exportRole, getDeptTreeSelect, getRole, getRoleList, getRoleMenuList, removeRole, updateRole, updateRoleDataScope } from '@/app/services/role';
import { DataNode } from 'antd/es/tree';
import { formatDeptTreeData, formatRoleMenuTreeData } from '@/app/common/utils/tree';
import DataScopeEdit from './datascopeedit';
import Link from 'next/link';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.Role) => {
  const hide = message.loading('loading...');
  try {
    await updateRole(fields);
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
const handleRemove = async (selectedRows: API.System.Role[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeRole(selectedRows.map((row) => row.roleId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.Role) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.roleId];
    await removeRole(params.join(','));
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
    await exportRole();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function RolePage({ children }: React.PropsWithChildren) {

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [roleList, setRoleList] = useState<API.System.Role[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.Role>();

    const [loading, setLoading] = useState(false);

    const [menuTree, setMenuTree] = useState<DataNode[]>();
    const [menuIds, setMenuIds] = useState<number[]>([]);
    const [deptTree, setDeptTree] = useState<DataNode[]>();
    const [deptIds, setDeptIds] = useState<number[]>([]);
    const [statusOptions, setStatusOptions] = useState<any>([]);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.Role[]>([]);

    const [dataScopeModalOpen, setDataScopeModalOpen] = useState<boolean>(false);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        updateRoleList(page);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.Role) => {
        try {
            await addRole(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateRoleList = async (current:number) => {
        setLoading(true);
        try{
            const roleListParams:API.System.RoleListParams = paramsForm.getFieldsValue();
            roleListParams.current = current as unknown as string;
            roleListParams.pageSize = "10";
            const res = await getRoleList(roleListParams);
            const listData:API.System.Role[] = res.data.rows as API.System.Role[]
            setRoleList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateRoleList(1);
    }

    useEffect(() => {
        updateRoleList(1);
    }, []);

    const rowSelection: TableRowSelection<API.System.Role> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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

    const addMenuBtnOnClick = ()=>{
        getRoleMenuList(-1).then((res) => {
            if (res.data.code === 200) {
                const treeData = formatRoleMenuTreeData(res.data.menus);
                setMenuTree(treeData);
                setMenuIds(res.data.checkedKeys);
                setEditDialogVisible(true);
            } else {
                message.warning(res.data.msg);
            }
        });
    }

    const onFinish: FormProps<API.System.RoleListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateRoleList(currentPage)
    };

    const onFinishFailed: FormProps<API.System.RoleListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.Role> = [
    {
        title: '角色编号',
        dataIndex: 'roleId',
        key: 'roleId',
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
    },
    {
        title: '权限字符',
        dataIndex: 'roleKey',
        key: 'roleKey',
    },
    {
        title: '显示顺序',
        dataIndex: 'roleSort',
        key: 'roleSort',
    },
    {
        title: '角色状态',
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
                key="dataPermission"
                onClick={async () => {
                    //展示数据权限modal
                    getRole(record.roleId).then(resp => {
                        if(resp.data.code === 200) {
                            setCurrentRow(resp.data.data);
                        }
                        })
                        getDeptTreeSelect(record.roleId).then(resp => {
                        if (resp.data.code === 200) {
                            setDeptTree(formatRoleMenuTreeData(resp.data.depts));
                            setDeptIds(resp.data.checkedKeys);
                            setDataScopeModalOpen(true);
                        }
                        })
                    }}
                >
            数据权限
            </Button>
            <Link
                href={"/system/role/roleuser/" + record.roleId}
                type="link"
                key="batchRemove"
                >
            分配用户
            </Link>
            <Button
                type="link"
                size="small"
                key="edit"
                onClick={() => {
                    getRoleMenuList(record.roleId).then((res) => {
                        if (res.data.code === 200) {
                            const treeData = formatRoleMenuTreeData(res.data.menus);
                            setMenuTree(treeData);
                            setMenuIds(res.data.checkedKeys);
                            setEditDialogVisible(true);
                            setCurrentRow(record);
                        } else {
                            message.warning(res.data.msg);
                        }
                        });
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
                             updateRoleList(1);
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
                        <Form.Item<API.System.Role>
                            label="角色编号"
                            name="roleId"
                            rules={[{ required: false, message: '请输入角色编号' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.Role>
                            label="角色名称"
                            name="roleName"
                            rules={[{ required: false, message: '请输入角色名称' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.Role>
                            label="角色状态"
                            name="status"
                            rules={[{ required: false, message: '请输入岗位状态' }]}>
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
                        <span className='text-1xl font-bold'>角色列表</span>
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
                                                updateRoleList(currentPage);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary'>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateRoleList(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.Role>
                            rowSelection={rowSelection}
                            dataSource={roleList}
                            columns={columns}
                            loading={loading}
                            pagination={false}
                            rowKey={(record)=>{return record.roleId;}}
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditRole
                onSubmit={async (values) => {
                    let success = false;
                    if (values.roleId) {
                        success = await handleUpdate({ ...values } as unknown as API.System.Role);
                    } else {
                        success = await handleAdd({ ...values } as unknown as API.System.Role);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateRoleList(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible}   
                menuTree={menuTree || []}
                menuCheckedKeys={menuIds || []} 
                statusOptions={statusOptions}     
                >
            </EditRole>
            <DataScopeEdit
                onSubmit={async (values: any) => {
                const success = await updateRoleDataScope(values);
                if (success) {
                    setDataScopeModalOpen(false);
                    setSelectedRows([]);
                    setCurrentRow(undefined);
                    message.success('success');
                }
                }}
                onCancel={() => {
                    setDataScopeModalOpen(false);
                    setSelectedRows([]);
                    setCurrentRow(undefined);
                }}
                open={dataScopeModalOpen}
                values={currentRow || {}}
                deptTree={deptTree || []}
                deptCheckedKeys={deptIds || []}
            />
     </div>
    );
}