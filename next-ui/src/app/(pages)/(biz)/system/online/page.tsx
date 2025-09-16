'use client'
import type { FormInstance, FormProps, TableColumnsType } from 'antd';
import { Button, Form, Input, message, Modal, Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import { forceLogout, getOnlineUserList } from '@/app/services/system/online';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';


const handleForceLogout = async (selectedRow: API.Monitor.OnlineUserType) => {
  const hide = message.loading("loading...");
  try {
    await forceLogout(selectedRow.tokenId);
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error('failed');
    return false;
  }
};

const OnlineUserTableList: React.FC = () => {

  const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);

  const [onlineUserList, setOnlineUserList] = useState<API.Monitor.OnlineUserType[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const[totalCount,  setTotalCount] = useState(0);

  const [currentRow, setCurrentRow] = useState<API.System.SysNotice>();

  const [paramsForm] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const updateOnlineUserList = async (current:number, pageSize:number) => {
        setLoading(true);
        try{
            const onlineUserListParams:API.Monitor.OnlineUserListParams = paramsForm.getFieldsValue();
            onlineUserListParams.current = current as unknown as string;
            onlineUserListParams.pageSize = String(pageSize);
            const res = await getOnlineUserList(onlineUserListParams as API.Monitor.OnlineUserListParams);
            const listData:API.Monitor.OnlineUserType[] = res.data.rows as API.Monitor.OnlineUserType[]
            setOnlineUserList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        setPageSize(pageSize)
        updateOnlineUserList(page, pageSize);
    }

    const resetFormParams = () => {
        updateOnlineUserList(1, pageSize);
    }

    const onFinish: FormProps<API.System.SysNoticeListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateOnlineUserList(currentPage, pageSize)
    };

    const onFinishFailed: FormProps<API.System.SysNoticeListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        updateOnlineUserList(1, pageSize);
    }, []);
  

  useEffect(() => {
    updateOnlineUserList(1, pageSize);
  }, []);

  const columns: TableColumnsType<API.Monitor.OnlineUserType> = [
    {
      title: "会话编号",
      dataIndex: 'tokenId',
      width:300
    },
    {
      title: "用户账号",
      dataIndex: 'userName',
    },
    {
      title: "部门名称",
      dataIndex: 'deptName',
    },
    {
      title: "登录IP地址",
      dataIndex: 'ipaddr',
    },
    {
      title: "登录地点",
      dataIndex: 'loginLocation',
    },
    {
      title: "浏览器类型",
      dataIndex: 'browser',
    },
    {
      title: "操作系统",
      dataIndex: 'os',
    },
    {
      title: "登录时间",
      dataIndex: 'loginTime',
      render: (_, record) => <span>{record.loginTime}</span>
    },
    {
      title: "操作",
      dataIndex: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          icon={<DeleteOutlined />}
          hidden={!access(userInfo).hasPerms('monitor:online:forceLogout')}
          onClick={async () => {
            Modal.confirm({
              title: '强踢',
              content: '确定强制将该用户踢下线吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleForceLogout(record);
                if (success) {
                  message.success("已强制下线")
                  resetFormParams();
                }
                else{
                  message.error("强制下线失败")
                }
              },
            });
          }}
        >
          强退
        </Button>,
      ],
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
                        
                        <Form.Item<API.Monitor.OnlineUserType>
                            label="用户名"
                            name="userName"
                            rules={[{ required: false, message: '请输入用户名' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                            
                        <Form.Item<API.Monitor.OnlineUserType>
                            label="会话编号"
                            name="tokenId"
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
                        <span className='text-1xl font-bold'>在线用户</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateOnlineUserList(currentPage, pageSize)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.Monitor.OnlineUserType>
                          dataSource={onlineUserList}
                          columns={columns}
                          loading={loading}
                          sticky={true}
                          pagination={false}
                          rowKey="tokenId"
                        />
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
     </div>
  );
};

export default OnlineUserTableList;
