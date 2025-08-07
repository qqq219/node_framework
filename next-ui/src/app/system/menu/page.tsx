'use client'
import { Card } from 'antd';
import type { FormProps } from 'antd';
import {Form, Input, Button, Select} from 'antd';
import { RedoOutlined, VerticalAlignMiddleOutlined,SettingOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from 'react'
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

const onFinish: FormProps<API.System.Menu>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<API.System.Menu>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const columns: ProColumns<API.System.Menu>[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '组件路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '菜单状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data: API.System.Menu[] = [
    {
        key: 1,
        menuId:"1",
        menuName: "菜单",
        orderNum: 1,
        path: "",
        status:  "",
        icon:  "",
        children: [
            {
                key:12,
                menuId:"12",
                menuName: "子菜单",
                orderNum: 11,
                path: "",
                status:  "",
                icon:  ""
            }
        ],
    },
    {
        key: 2,
        menuId:"2",
        menuName: "菜单",
        orderNum: 1,
        path: "",
        status:  "",
        icon:  "",
        children: [
            {
                key:22,
                menuId:"22",
                menuName: "子菜单",
                orderNum: 11,
                path: "",
                status:  "",
                icon:  ""
            }
        ]
    }
];

export default function MenuPage({ children }: React.PropsWithChildren) {
    
    const [checkStrictly, setCheckStrictly] = useState(false);

    const rowSelection: TableRowSelection<API.System.Menu> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className="mt-5 w-full flex">
                <Card className="w-full">
                    <Form
                        name="basic"
                        layout="inline"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='w-full flex !pl-10 !pr-10'>
                        <Form.Item<API.System.Menu>
                            label="菜单名称"
                            name="menuName"
                            rules={[{ required: true, message: '请输入菜单名称' }]}>
                            <Input className='!w-64' />
                        </Form.Item>
                        <Form.Item<API.System.Menu>
                            label="菜单状态"
                            name="menuName"
                            rules={[{ required: true, message: '请输入菜单名称' }]}>
                            <Select
                                options={[
                                    { value: 'valid', label: '正常' },
                                    { value: 'invalid', label: '停用' }
                                ]}
                                className='!w-64'/>
                        </Form.Item>
                        <div className='flex-1 flex justify-end'>
                            <Button className='w-button-primary'>重置</Button>
                            <Button type="primary" className='ml-5 w-button-primary'>查询</Button>
                        </div> 
                    </Form>
                </Card>
            </div>
            <div className="mt-6 flex-1 w-full">
                <Card className="h-full">
                    <div className='w-full'>
                        <ProTable<API.System.Menu>
                            rowSelection={{ ...rowSelection, checkStrictly }}
                            dataSource={data}
                            headerTitle="查询表格"
                            search={false}
                            columns={columns}
                            toolBarRender={() => [
                                <div className='flex gap-3'>
                                    <Button type="primary" className='w-button-primary'>+ 新建</Button>
                                    <Button type="primary" className='w-button-primary'>+ 导出</Button>
                                </div>
                            ]}/>
                    </div>
                </Card>
            </div>
     </div>
    );
}