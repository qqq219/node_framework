'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { use, useEffect, useState } from 'react'
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import { allocatedUserList, authUserCancel, authUserCancelAll, authUserSelectAll, unallocatedUserList } from '@/app/services/system/role';
import UserSelectorModal from './userselector';
import { HttpResult } from '@/app/common/enum/httpEnum';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];


/**
 * 删除节点
 *
 * @param roleId
 * @param selectedRows
 */
const cancelAuthUserAll = async (roleId: number, selectedRows: API.System.User[]) => {
	const hide = message.loading('loading...');
	if (!selectedRows) return true;
	try {
		const userIds = selectedRows.map((row) => row.userId).join(',');
		const resp = await authUserCancelAll({roleId, userIds});
		hide();
		if (resp.data.code === 200) {
			message.success('success');
		} else {
			message.error(resp.data.msg);
		}
		return true;
	} catch (error) {
		hide();
		message.error(error instanceof Error ? error.message : 'failed');
		return false;
	}
};

const cancelAuthUser = async (roleId: number, userId: number) => {
	const hide = message.loading('loading...');
	try {
		const resp = await authUserCancel({ userId, roleId });
		hide();
		if (resp.data.code === 200) {
			message.success('success');
		} else {
			message.error(resp.data.msg);
		}
		return true;
	} catch (error) {
		hide();
		message.error(error instanceof Error ? error.message : 'failed');
		return false;
	}
};

export default function RoleUserPage({ params }: {params: Promise<{ roleId: number }>}) {
    const param = use(params)

    const roleId = param.roleId;

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [roleUserList, setUserList] = useState<API.System.User[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.User>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [selectedRows, setSelectedRows] = useState<API.System.User[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        updateUserList(page, pageSize);
    }

    const updateUserList = async (current:number, pageSize:number) => {
        setLoading(true);
        try{
            const roleUserListParams:API.System.RoleListParams = paramsForm.getFieldsValue();
            roleUserListParams.current = current as unknown as string;
            roleUserListParams.pageSize = "10";
            const res = await allocatedUserList({ ...roleUserListParams, roleId } as unknown as API.System.RoleListParams);
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
        updateUserList(1, pageSize);
    }

    useEffect(() => {
        updateUserList(1, pageSize);
    }, []);

    const rowSelection: TableRowSelection<API.System.User> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys)
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
            setSelectedRows(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
            setSelectedRows(selectedRows);
        },
        selectedRowKeys:selectedRowKeys
    };

    const addMenuBtnOnClick = ()=>{
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.System.UserListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateUserList(currentPage, pageSize)
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
        title: '手机号码',
        dataIndex: 'phonenumber',
        key: 'phonenumber',
    },
    {
        title: '帐号状态',
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
                danger
                key="batchRemove"
                onClick={async () => {
                    Modal.confirm({
                    title: '取消授权',
                    content: '确定取消授权吗?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        setSelectedRowKeys([]);
                        setSelectedRows([]);
                        const success = await cancelAuthUser(roleId, record.userId);
                        if (success) {
                            updateUserList(1, pageSize);
                        }
                    },
                    });
                }}
                >
            取消授权
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
                        <Form.Item<API.System.User>
                            label="用户编号"
                            name="userId"
                            rules={[{ required: false, message: '请输入用户编号' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.User>
                            label="用户账号"
                            name="userName"
                            rules={[{ required: false, message: '请输入岗位编码' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.User>
                            label="用户昵称"
                            name="nickName"
                            rules={[{ required: false, message: '请输入岗位名称' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.User>
                            label="手机号"
                            name="phonenumber"
                            rules={[{ required: false, message: '请输入手机号' }]}>
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
                        <span className='text-1xl font-bold'>角色用户列表</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button type="primary" className='w-button-primary' onClick={addMenuBtnOnClick}>+ 添加用户</Button>
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
                                           const success = await cancelAuthUserAll(roleId, selectedRows);
										    if (success) {
											    setSelectedRows([]);
                                                setSelectedRowKeys([]);
                                                updateUserList(currentPage, pageSize);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量取消授权
                            </Button>
                            <Button type="primary" className='w-button-primary'>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateUserList(currentPage, pageSize)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.User>
                            rowSelection={rowSelection}
                            dataSource={roleUserList}
                            columns={columns}
                            loading={loading}
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
            <UserSelectorModal
                onSubmit={async (values) => {
                   const userIds = values.join(",");
                        if (userIds === "") {
                            message.warning("请选择要分配的用户");
                            return;
                        }
                        authUserSelectAll({ roleId: roleId, userIds: userIds }).then(resp => {
                            if (resp.data.code === HttpResult.SUCCESS) {
                                message.success('success！');
                                updateUserList(1, pageSize);
                            } else {
                                message.warning(resp.data.msg);
                            }
                        })
                        setEditDialogVisible(false);
                    }
                }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                params={{roleId}}
                open={editDialogVisible} 
                >
            </UserSelectorModal>
     </div>
    );
}