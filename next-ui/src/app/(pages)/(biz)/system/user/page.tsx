'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination, TreeSelect} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import EditUser from './edit';
import { addUser, exportUser, getDeptTree, getUser, getUserList, removeUser, updateUser } from '@/app/services/user';
import Tree, { DataNode } from 'antd/es/tree';
import { formatRoleMenuTreeData } from '@/app/common/utils/tree';
import { getDictSelectOption, getDictValueEnum } from '@/app/services/dict';
import { getPostList } from '@/app/services/post';
import { getRoleList } from '@/app/services/role';
import { DefaultOptionType } from 'antd/es/select';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.User) => {
  const hide = message.loading('loading...');
  try {
    await updateUser(fields);
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
const handleRemove = async (selectedRows: API.System.User[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeUser(selectedRows.map((row) => row.userId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.User) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.userId];
    await removeUser(params.join(','));
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
    await exportUser();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function UserPage({ children }: React.PropsWithChildren) {

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [userList, setUserList] = useState<API.System.User[]>([]);

    const [deptId, setDeptId] = useState<number>(101);

    const [defaultExpandKeys, setDefaultExpandKeys] = useState<number[]>([100]);

    const [currentPage, setCurrentPage] = useState(1);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.User>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.User[]>([]);
    const [sexOptions, setSexOptions] = useState<any>([]);

    const [postIds, setPostIds] = useState<string[]>();
    const [postList, setPostList] = useState<DefaultOptionType[]>();
    const [roleIds, setRoleIds] = useState<number[]>();
    const [roleList, setRoleList] = useState<DefaultOptionType[]>();
    const [deptTree, setDeptTree] = useState<DataNode[]>();

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        updateUserList(page);
    }

    const fetchUserInfo = async (userId: number) => {
        const res = await getUser(userId);
        setPostIds(res.data.postIds);

        setPostList(
        res.data.posts.map((item: any) => {
            return {
            value: item.postId,
            label: item.postName,
            };
        }),
        );
        setRoleIds(res.data.roleIds);
        setRoleList(
        res.data.roles.map((item: any) => {
            return {
            value: item.roleId,
            label: item.roleName,
            };
        }),
        );
    };

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.User) => {
        try {
            await addUser(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateUserList = async (current:number) => {
        setLoading(true);
        try{
            const userListParams = paramsForm.getFieldsValue();
            userListParams.current = current as unknown as string;
            userListParams.pageSize = "10";
            const res = await getUserList({...userListParams,...{deptId:deptId}});
            const listData:API.System.User[] = res.data.rows as API.System.User[]
            setUserList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateUserList(1);
    }

    const updateDeptTreeData = async () => {
        const res = await getDeptTree({});
        setDeptTree(formatRoleMenuTreeData(res.data.data));
        // console.log("=====>" + JSON.stringify(res.data.data))
        // setDefaultExpandKeys(res.data.data.map((item:any) => {
        //     console.log("id:" + item.id)
        //     return item.id
        // }));
    }

    useEffect( () => {
        getDictSelectOption('sys_user_sex').then((data) => {
            setSexOptions(data);
        });
        updateUserList(1);
        updateDeptTreeData();
    }, []);

    useEffect( () => {
        updateUserList(1);
    }, [deptId]);

    const rowSelection: TableRowSelection<API.System.User> = {
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

    const addBtnOnClick = async ()=>{
        const res = await getDeptTree({});
        setDeptTree(formatRoleMenuTreeData(res.data.data));
        const postResp = await getPostList()
        if (postResp.data.code === 200) {
        setPostList(
            postResp.data.rows.map((item: any) => {
            return {
                value: item.postId,
                label: item.postName,
            };
            }),
        );
        }

        const roleResp = await getRoleList()
        if (roleResp.data.code === 200) {
        setRoleList(
            roleResp.data.rows.map((item: any) => {
            return {
                value: item.roleId,
                label: item.roleName,
            };
            }),
        );
        }
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.System.UserListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateUserList(currentPage)
    };

    const onFinishFailed: FormProps<API.System.UserListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.User> = [
    {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '用户账号',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '用户昵称',
        dataIndex: 'nickName',
        key: 'nickName',
    },
    {
        title: '部门',
        dataIndex: ['dept', 'deptName'],
        key: 'deptName',
    },
    {
        title: '手机号码',
        dataIndex: 'phonenumber',
        key: 'phonenumber',
    },
    {
        title: '账号状态',
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
                onClick={async () => {
                    const res = await getDeptTree({});
                    setDeptTree(formatRoleMenuTreeData(res.data.data));
                    fetchUserInfo(record.userId);
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
                            updateUserList(1);
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
        <div className='w-full h-full flex flex-row'>
            <div className='w-60 h-full pt-5 pr-5'>
                <div className='w-full h-full rounded-md p-2 border-' style={{border:"var(--border-primary)"}}>
                    {
                        deptTree && deptTree.length > 0 &&
                        <Tree
                            style={{ width: '100%' }}
                            onSelect={(selectedKeys)=>{
                                setDeptId(selectedKeys[0] as number)
                            }}
                            autoExpandParent
                            defaultExpandAll
                            treeData={deptTree}
                        />
                    }
                </div>
            </div>
            <div className='flex-1 h-full flex flex-col items-center w-0'>
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
                            <Form.Item<API.System.User>
                                label="用户编号"
                                name="userId"
                                rules={[{ required: false, message: '请输入用户编号' }]}>
                                <Input className='!w-64' allowClear/>
                            </Form.Item>
                            <Form.Item<API.System.User>
                                label="用户账号"
                                name="userName"
                                rules={[{ required: false, message: '请输入用户账号' }]}>
                                <Input className='!w-64' allowClear/>
                            </Form.Item>
                            <Form.Item<API.System.User>
                                label="用户昵称"
                                name="nickName"
                                rules={[{ required: false, message: '请输入用户昵称' }]}>
                                <Input className='!w-64' allowClear/>
                            </Form.Item>
                            <Form.Item<API.System.User>
                                label="手机号码"
                                name="phonenumber"
                                rules={[{ required: false, message: '请输入手机号码' }]}>
                                <Input className='!w-64' allowClear/>
                            </Form.Item>
                            <Form.Item<API.System.User>
                                label="账号状态"
                                name="status"
                                rules={[{ required: false, message: '请输入账号状态' }]}>
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
                            <span className='text-1xl font-bold'>岗位列表</span>
                            <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                                <Button type="primary" className='w-button-primary' onClick={addBtnOnClick}>+ 新建</Button>
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
                                                    updateUserList(currentPage);
                                                }
                                            },
                                            onCancel() {},
                                        });
                                    }}>
                                        批量删除
                                </Button>
                                <Button type="primary" className='w-button-primary'>+ 导出</Button>
                                <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateUserList(currentPage)}}><SyncOutlined /></div>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                            <Table<API.System.User>
                                rowSelection={rowSelection}
                                dataSource={userList}
                                columns={columns}
                                loading={loading}
                                sticky={true}
                                pagination={false}
                                rowKey="userId"
                            >
                            </Table>
                            <div className='mt-4 w-full flex flex-col items-center'>
                                <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                            </div>
                        </div>
                    </div>
                </div>
                {/*编辑弹窗 */}
                <EditUser
                    onSubmit={async (values) => {
                        let success = false;
                        if (values.userId) {
                            success = await handleUpdate({ ...values } as API.System.User);
                        } else {
                            success = await handleAdd({ ...values } as API.System.User);
                        }
                        if (success) {
                            setEditDialogVisible(false);
                            setCurrentRow(undefined);
                            updateUserList(1);
                        }
                    }}
                    onCancel={() => {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                    }}
                    open={editDialogVisible}
                    values={currentRow || {}}
                    sexOptions={sexOptions}
                    posts={postList || []}
                    postIds={postIds || []}
                    roles={roleList || []}
                    roleIds={roleIds || []}
                    depts={deptTree || []}
                    >
                </EditUser>
        </div>
     </div>
    );
}
