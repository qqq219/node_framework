import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Table, TableColumnsType, Tag } from 'antd';
import { ActionType, ParamsType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components';
import { unallocatedUserList } from '@/app/services/system/role';
import { TableRowSelection } from 'antd/es/table/interface';

export type DataScopeFormProps = {
  onCancel: () => void;
  onSubmit: (values: React.Key[]) => void;
  open: boolean;
  params: ParamsType;
};

const UserSelectorModal: React.FC<DataScopeFormProps> = (props) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [paramsForm] = Form.useForm();

  const {params, open} = props;

  const [selectedRows, setSelectedRows] = useState<API.System.User[]>([]);

  const [loading, setLoading] = useState(false);

  const [userList, setUserList] = useState<API.System.User[]>();

  const handleOk = () => {
    props.onSubmit(selectedRowKeys);
    setSelectedRowKeys([])
  };
  const handleCancel = () => {
    props.onCancel();
  };
   
  const updateUserList = async () => {
    setLoading(true);
    try{
      const roleUserListParams:API.System.RoleListParams = paramsForm.getFieldsValue();
      const unallocatedUserListResp = await unallocatedUserList({ ...roleUserListParams, ...params } as API.System.RoleListParams);
      const listData:API.System.User[] = unallocatedUserListResp.data.rows as API.System.User[]
      setUserList(listData);
      setLoading(false);
    }
    catch(error){
      setLoading(false);
    }
  };

  useEffect(() => {
      updateUserList();
  }, [open]);

  const onFinish: FormProps<API.System.UserListParams>['onFinish'] = (values) => {
      console.log('Success:', values);
      updateUserList();
  };

  const onFinishFailed: FormProps<API.System.UserListParams>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };

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

  const resetFormParams = () => {
      paramsForm.resetFields();
      updateUserList();
  }

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
  ];

  return (
    <div>
      <Modal
        width={1000}
        title={'选择用户'}
        open={props.open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='w-full h-150 flex flex-col items-center'>
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
                              label="用户账号"
                              name="userName"
                              rules={[{ required: false, message: '请输入用户账号' }]}>
                              <Input className='!w-48' allowClear/>
                          </Form.Item>
                          <Form.Item<API.System.User>
                              label="手机号码"
                              name="phonenumber"
                              rules={[{ required: false, message: '请输入手机号码' }]}>
                              <Input className='!w-48' allowClear/>
                          </Form.Item>
                          <div className='flex-1 flex justify-start'>
                              <Button className='w-button-primary' onClick={resetFormParams}>重置</Button>
                              <Button type="primary" className='ml-5 w-button-primary' htmlType="submit">查询</Button>
                          </div> 
                      </Form>
                  </div>
              </div>
              {/*表格栏 */}
              <div className="mt-6 flex-1 w-full rounded-md p-5" style={{border:"var(--border-primary)"}}>
                  <div className="h-full w-full flex flex-col">
                      <div className='w-full h-10 flex flex-col pr-5'>
                        <span className='text-1xl font-bold'>角色用户列表</span>
                        <div className='flex flex-1 flex-col mt-5 w-full'>
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
                        </div>
                      </div>
                  </div>
              </div>
      </div>
      </Modal>
    </div>
  );
};

export default UserSelectorModal;
