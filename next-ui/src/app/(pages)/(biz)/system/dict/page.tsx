'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import EditDictType from './edit';
import { addDictType, exportDictType, getDictTypeList, removeDictType, updateDictType } from '@/app/services/system/dict';
import Link from 'next/link';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.DictType) => {
  const hide = message.loading('loading...');
  try {
    await updateDictType(fields);
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
const handleRemove = async (selectedRows: API.System.DictType[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeDictType(selectedRows.map((row) => row.dictId).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.DictType) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.dictId];
    await removeDictType(params.join(','));
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
    await exportDictType();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function DictTypePage() {

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [dictTypeList, setDictTypeList] = useState<API.System.DictType[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
      
    const [pageSize, setPageSize] = useState(10);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.DictType>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.DictType[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        setPageSize(pageSize)
        updateDictTypeList(page, pageSize);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.DictType) => {
        try {
            await addDictType(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateDictTypeList = async (current:number, pageSize:number) => {
        setLoading(true);
        try{
            const dictTypeListParams:API.System.DictTypeListParams = paramsForm.getFieldsValue();
            dictTypeListParams.current = String(current);
            dictTypeListParams.pageSize = String(pageSize);
            const res = await getDictTypeList(dictTypeListParams);
            const listData:API.System.DictType[] = res.data.rows as API.System.DictType[]
            setDictTypeList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateDictTypeList(1, pageSize);
    }

    useEffect(() => {
        updateDictTypeList(1, pageSize);
    }, []);

    const rowSelection: TableRowSelection<API.System.DictType> = {
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
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.System.DictTypeListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateDictTypeList(currentPage, pageSize)
    };

    const onFinishFailed: FormProps<API.System.DictTypeListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.DictType> = [
    {
        title: '字典主键',
        dataIndex: 'dictId',
        key: 'dictId',
    },
    {
        title: '字典名称',
        dataIndex: 'dictName',
        key: 'dictName',
    },
    {
        title: '字典类型',
        dataIndex: 'dictType',
        key: 'dictType',
        render: (_, record) => {
            return ( <Link href={"/system/dictdata/" + record.dictType}>{record.dictType}</Link>);
        },
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            return ( <Tag color={record.status == "0"?"blue":"red"}>{record.status == "0"?"正常":"停用"}</Tag>);
        },
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
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
                            updateDictTypeList(1, pageSize);
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
                        <Form.Item<API.System.DictType>
                            label="字典名称"
                            name="dictName"
                            rules={[{ required: false, message: '请输入字典名称' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.DictType>
                            label="字典类型"
                            name="dictType"
                            rules={[{ required: false, message: '请输入字典类型' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.DictType>
                            label="状态"
                            name="status"
                            rules={[{ required: false, message: '请输入状态' }]}>
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
                        <span className='text-1xl font-bold'>字典列表</span>
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
                                                updateDictTypeList(currentPage, pageSize);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateDictTypeList(currentPage, pageSize)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.DictType>
                            rowSelection={rowSelection}
                            dataSource={dictTypeList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="dictId"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditDictType
                onSubmit={async (values) => {
                    let success = false;
                    if (values.menuId) {
                        success = await handleUpdate({ ...values } as API.System.DictType);
                    } else {
                        success = await handleAdd({ ...values } as API.System.DictType);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateDictTypeList(currentPage, pageSize);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible} dictTypeList={[]}            >
            </EditDictType>
     </div>
    );
}