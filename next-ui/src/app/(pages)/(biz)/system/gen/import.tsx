import { Button, Card, message, Layout, TableColumnsType, Table, Modal, Form, FormProps, Input, Pagination } from 'antd';
import React, { useState } from 'react';
import { importTables, queryTableList } from '@/app/services/system/gen';
import { TableRowSelection } from 'antd/es/table/interface';
import { SyncOutlined } from '@ant-design/icons';

export type ImportTableListData = Record<string, unknown> & Partial<API.System.GenCodeType>;

export type ImportTableListProps = {
  onCancel: (flag?: boolean, formVals?: ImportTableListData) => void;
  onSubmit: (values: ImportTableListData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.GenCodeType>;
}

const handleImport = async (tables: string) => {
  const hide = message.loading('loading...');
  try {
    await importTables(tables);
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const ImportTableList: React.FC<ImportTableListProps> = (props) => {
  const [selectTables, setSelectTables] = useState<string[]>([]);

  const [genTableList, setGenTableList] = useState<API.System.GenCodeTableListParams[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const[totalCount,  setTotalCount] = useState(0);

  const [currentRow, setCurrentRow] = useState<API.System.GenCodeTableListParams>();

  const [loading, setLoading] = useState(false);

  const [paramsForm] = Form.useForm();

  const [selectedRows, setSelectedRows] = useState<API.System.GenCodeTableListParams[]>([]);

  const handleOk = () => {

  };
  const handleCancel = () => {
      props.onCancel();
  };
  const onPageChange = (page:number, pageSize:number) => {
      setCurrentPage(page);
      updateGenTableList(page);
  }

  const updateGenTableList = async (current:number) => {
      setLoading(true);
      try{
          const genTableListParams:API.System.GenCodeTableListParams = paramsForm.getFieldsValue();
          genTableListParams.current = current as unknown as string;
          genTableListParams.pageSize = "10";
          const res = await queryTableList(genTableListParams);
          const listData:API.System.GenCodeTableListParams[] = res.data.rows as API.System.GenCodeTableListParams[]
          setGenTableList(listData);
          setTotalCount(res.data.total);
          setLoading(false);
      }
      catch(error){
          setLoading(false);
      }
  };
  const resetFormParams = () => {
      paramsForm.resetFields();
      updateGenTableList(1);
  }
  const submitGenTable = ()=>{

  }
  const handleReturn = ()=>{

  }
  const onFinish: FormProps<API.System.GenCodeTableListParams>['onFinish'] = (values) => {
      console.log('Success:', values);
  };

  const onFinishFailed: FormProps<API.System.GenCodeTableListParams>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
  const rowSelection: TableRowSelection<API.System.GenCodeTableListParams> = {
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

  const columns: TableColumnsType<API.System.GenCodeTableListParams> = [
    {
      title:  "表名称" ,
      dataIndex: 'tableName',
    },
    {
      title:  "表描述",
      dataIndex: 'tableComment',
    },
    {
      title:  "创建时间",
      dataIndex: 'createTime',
    },
  ];

  return (
    <div>
        <Modal
            title="导入数据表"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={props.open}
            onOk={handleOk}
            onCancel={handleCancel}
            className='!w-200'
            >
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
                        <Form.Item<API.System.GenCodeTableListParams>
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
                        <span className='text-1xl font-bold'>数据表列表</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button type="primary" className='w-button-primary' onClick={submitGenTable}>+ 提交</Button>
                            <Button type="primary" className='w-button-primary' onClick={handleReturn}>+ 返回</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{updateGenTableList(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.System.GenCodeTableListParams>
                            rowSelection={rowSelection}
                            dataSource={genTableList}
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
          </Modal>
      </div>
  );
};

export default ImportTableList;
