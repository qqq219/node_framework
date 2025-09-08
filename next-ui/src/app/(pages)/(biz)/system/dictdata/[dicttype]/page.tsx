'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { use, useEffect, useState } from 'react'
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import EditDictData from './edit';
import { addDictData, exportDictData, getDictDataList, removeDictData, updateDictData } from '@/app/services/dictdata';
import { getByDictType, getDictType } from '@/app/services/dict';
import Link from 'next/link';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.System.DictData) => {
  const hide = message.loading('loading...');
  try {
    await updateDictData(fields);
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
const handleRemove = async (selectedRows: API.System.DictData[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeDictData(selectedRows.map((row) => row.dictCode).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.DictData) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.dictCode];
    await removeDictData(params.join(','));
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
    await exportDictData();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function DictDataPage({  params }: {params: Promise<{ dicttype: string }>}) {

    const param = use(params)

    const dicttype = param.dicttype;

    const [dictTypeData, setDictTypeData] = useState<API.System.DictType>()

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [dictDataList, setDictDataList] = useState<API.System.DictData[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.DictData>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.DictData[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        updateDictDataList(page);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.System.DictData) => {
        try {
            await addDictData(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const updateDictDataList = async (current:number) => {
        setLoading(true);
        try{
            const dictDataListParams:API.System.DictDataListParams = paramsForm.getFieldsValue();
            dictDataListParams.current = current as unknown as string;
            dictDataListParams.pageSize = "10";
            const res = await getDictDataList(dictDataListParams);
            const listData:API.System.DictData[] = res.data.rows as API.System.DictData[]
            setDictDataList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const getDictTypeData = async (dictType:string) => {
        
        const dictTypeResp = await getByDictType(param.dicttype);

        const result = dictTypeResp.data.data as API.System.DictType;
        
        setDictTypeData(result)

    }

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateDictDataList(1);
    }

    useEffect(() => {
        getDictTypeData(dicttype);
        updateDictDataList(1);
    }, []);

    const rowSelection: TableRowSelection<API.System.DictData> = {
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

    const onFinish: FormProps<API.System.DictDataListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateDictDataList(currentPage)
    };

    const onFinishFailed: FormProps<API.System.DictDataListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.DictData> = [
    {
        title: '字典编码',
        dataIndex: 'dictCode',
        key: 'dictCode',
    },
    {
        title: '字典标签',
        dataIndex: 'dictLabel',
        key: 'dictLabel'
    },
    {
        title: '字典键值',
        dataIndex: 'dictValue',
        key: 'dictValue',
    },
    {
        title: '字典排序',
        dataIndex: 'dictSort',
        key: 'dictSort',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            return ( <Tag color={record.status == "0"?"blue":"red"}>{record.status == "0"?"正常":"停用"}</Tag>);
        },
    },
    {
        title: '备注',
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
                            updateDictDataList(1);
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
                        <Form.Item<API.System.DictData>
                            label="字典标签"
                            name="dictLabel"
                            rules={[{ required: false, message: '请输入字典标签' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.DictData>
                            label="字典类型"
                            name="dictType"
                            rules={[{ required: false, message: '请输入字典类型' }]}
                            initialValue={dicttype}>
                            <Input className='!w-64' allowClear disabled/>
                        </Form.Item>
                        <Form.Item<API.System.DictData>
                            label="字典键值"
                            name="dictValue"
                            rules={[{ required: false, message: '请输入字典键值' }]}>
                            <Input className='!w-64' allowClear/>
                        </Form.Item>
                        <Form.Item<API.System.DictData>
                            label="字典状态"
                            name="status"
                            rules={[{ required: false, message: '请输入字典状态' }]}>
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
                        <span className='text-1xl font-bold'>字典键值列表</span>
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
                                                updateDictDataList(currentPage);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateDictDataList(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.DictData>
                            rowSelection={rowSelection}
                            dataSource={dictDataList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="dictCode"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditDictData
                onSubmit={async (values) => {
                    let success = false;
                    if (values.menuId) {
                        success = await handleUpdate({ ...values } as API.System.DictData);
                    } else {
                        success = await handleAdd({ ...values } as API.System.DictData);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateDictDataList(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible}
                dicttype={dictTypeData}          
                >
            </EditDictData>
     </div>
    );
}