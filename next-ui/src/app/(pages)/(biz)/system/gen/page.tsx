'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { use, useEffect, useState } from 'react'
import _ from "lodash"
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import EditGen from './edit';
import { batchGenCode, genCode, getGenCodeList, previewCode, removeData, syncDbInfo, updateData } from '@/app/services/gen';
import { useRouter } from 'next/navigation';
import ImportTableList from './import';
import PreviewModel from './PreviewModel';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 修改生成表信息
 *
 * @param selectedRows
 */
const handleEditUpdate = async (values: API.System.GenCodeType) => {
    const hide = message.loading('loading...');
    try {
      const resp = await updateData({ ...values } as API.System.GenCodeType);
      hide();
      if(resp.data.code === 200){
        message.success('success');
        return true;
      }
      else{
        message.error(resp.data.msg);
        return false;
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'failed');
      return false;
    }
}

const handleImportUpdate = async (values: API.System.GenCodeType) => {
    const hide = message.loading('loading...');
    try {
      const resp = await updateData({ ...values } as API.System.GenCodeType);
      hide();
      if(resp.data.code === 200){
        message.success('success');
        return true;
      }
      else{
        message.error(resp.data.msg);
        return false;
      }
    } catch (error) {

      message.error(error instanceof Error ? error.message : 'failed');
      return false;
    }
}

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.System.GenCodeType[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await removeData({
      ids: selectedRows.map((row) => row.tableId),
    });
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
     message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.System.GenCodeType) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.tableId];
    await removeData({
      ids: params,
    });
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
     message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleImport = async () => {
    window.open('/tool/gen/import');
}

export default function GenPage() {

    const [showPreview, setShowPreview] = useState<boolean>(false);

    const [preivewData, setPreivewData] = useState<boolean>(false);

    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [importDialogVisible, setImportDialogVisible] = useState(false);

    const [genList, setGenList] = useState<API.System.GenCodeType[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.System.GenCodeType>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.System.GenCodeType[]>([]);

    const router = useRouter();

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        updateGenList(page);
    }

    const updateGenList = async (current:number) => {
        setLoading(true);
        try{
            const genListParams:API.System.GenCodeTableListParams = paramsForm.getFieldsValue();
            genListParams.current = current as unknown as string;
            genListParams.pageSize = "10";
            const res = await getGenCodeList(genListParams);
            const listData:API.System.GenCodeType[] = res.data.rows as API.System.GenCodeType[]
            setGenList(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        updateGenList(1);
    }

    useEffect(() => {
        updateGenList(1);
    }, []);

    const rowSelection: TableRowSelection<API.System.GenCodeType> = {
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

    const genCodeClick = ()=>{
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.System.GenCodeTableListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateGenList(currentPage)
    };

    const onFinishFailed: FormProps<API.System.GenCodeTableListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.System.GenCodeType> = [
    {
      title: "编号",
      dataIndex: 'tableId'
    },
    {
      title: "表名",
      dataIndex: 'tableName',
    },
    {
      title: "表描述",
      dataIndex: 'tableComment',
    },
    {
      title: "实体",
      dataIndex: 'className',
    },
    {
      title: "创建时间" ,
      dataIndex: 'createTime',
    },
    {
      title: "更新时间",
      dataIndex: 'updateTime',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
        <div>
        <Button
          type="link"
          size="small"
          key="preview"
          onClick={() => {
            previewCode(record.tableId).then((res) => {
              if (res.data.code === 200) {
                setPreivewData(res.data.data);
                setShowPreview(true);
              } else {
                message.error('failed');
              }
            });
          }}
        >
          预览
        </Button>
        <Button
          type="link"
          size="small"
          key="config"
          onClick={() => {
            setCurrentRow(record);  
            setEditDialogVisible(true);
          }}
        >
          编辑
        </Button>
        <Button
          type="link"
          size="small"
          danger
          key="delete"
          onClick={async () => {
            Modal.confirm({
              title: '确认执行该操作吗?',
              content:  '请谨慎操作!',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  updateGenList(currentPage);
                }
              },
            });
          }}
        >
          删除
        </Button>
        <Button
          type="link"
          size="small"
          key="sync"
          hidden={true}
          onClick={() => {
            syncDbInfo(record.tableName).then((res) => {
              if (res.data.code === 200) {
                message.success('success');
              } else {
                message.error('同步失败');
              }
            });
          }}
        >
          同步
        </Button>
        <Button
          type="link"
          size="small"
          key="gencode"
          onClick={() => {
            if (record.genType === '1') {
              genCode(record.tableName).then((res) => {
                if (res.data.code === 200) {
                  message.success(`success：${record.genPath}`);
                } else {
                  message.error(res.data.msg);
                }
              });
            } else {
              batchGenCode(record.tableName);
            }
          }}
        >
          生成代码
        </Button>
        </div>
        )
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
                        <Form.Item<API.System.GenCodeType>
                            label="表名"
                            name="tableName"
                            rules={[{ required: false, message: '请输入表名' }]}>
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
                        <span className='text-1xl font-bold'>代码生成列表</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button type="primary" className='w-button-primary' onClick={genCodeClick}>+ 生成</Button>
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
                                                updateGenList(currentPage);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleImport}>+ 导入</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateGenList(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.GenCodeType>
                            rowSelection={rowSelection}
                            dataSource={genList}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="tableId"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <EditGen
                onSubmit={async (values) => {
                    let success = false;
                    if (values.tableId) {
                        success = await handleEditUpdate({ ...values } as API.System.GenCodeType);
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateGenList(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible}
                >
            </EditGen>
            {/*导入弹窗 */}
            <ImportTableList
                onSubmit={async (values) => {
                    let success = false;
                    if (values.tableId) {
                        success = await handleImportUpdate({ ...values } as API.System.GenCodeType);
                    }
                    if (success) {
                        setImportDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            updateGenList(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setImportDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={importDialogVisible}
                >
            </ImportTableList>
            <PreviewModel
              open={showPreview}
              data={preivewData}
              onHide={() => {
                setShowPreview(false);
              }}
            />
     </div>
    );
}