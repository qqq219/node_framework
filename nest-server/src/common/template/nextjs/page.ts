import { GenTableColumnEntity } from "src/system/model/entity/GenTableCloumn.entity";
import { getPkField, lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils/gen.tool";

export const reactPageTem = (options) => {
  const { businessName, functionName, functionAuthor, moduleName,className,columns } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const pkField:string = getPkField(columns);
  return `/**
 * @author ${functionAuthor}
 */

'use client'
import {FormProps,Table, Modal, Form, Input, Button, Select, message, Pagination} from 'antd';
import type {TableProps, TableColumnsType} from 'antd';
import { useEffect, useState } from 'react'
import {SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Tag } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';
import Edit${className} from './edit';
import { add${className}, export${className}, get${className}List, remove${className}, update${className} } from '@/app/services/${moduleName}/${lfclassName}';

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.${upperModuleName}.${className}) => {
  const hide = message.loading('loading...');
  try {
    await update${className}(fields);
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
const handleRemove = async (selectedRows: API.${upperModuleName}.${className}[]) => {
  const hide = message.loading('loading...');
  if (!selectedRows) return true;
  try {
    await remove${className}(selectedRows.map((row) => row.${pkField}).join(','));
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: API.${upperModuleName}.${className}) => {
  const hide = message.loading('loading...');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.${pkField}];
    await remove${className}(params.join(','));
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
    await export${className}();
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error(error instanceof Error ? error.message : 'failed');
    return false;
  }
};

export default function ${className}Page() {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);

    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const [${lfclassName}List, set${className}List] = useState<API.${upperModuleName}.${className}[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const[totalCount,  setTotalCount] = useState(0);

    const [currentRow, setCurrentRow] = useState<API.${upperModuleName}.${className}>();

    const [loading, setLoading] = useState(false);

    const [paramsForm] = Form.useForm();

    const [selectedRows, setSelectedRows] = useState<API.${upperModuleName}.${className}[]>([]);

    const onPageChange = (page:number, pageSize:number) => {
        setCurrentPage(page);
        update${className}List(page);
    }

    /**
     * 添加节点
     *
     * @param fields
     */
    const handleAdd = async (fields: API.${upperModuleName}.${className}) => {
        try {
            await add${className}(fields);
            message.success('success');
            return true;
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'failed');
            return false;
        }
    };

    const update${className}List = async (current:number) => {
        setLoading(true);
        try{
            const ${lfclassName}ListParams:API.${upperModuleName}.${className}ListParams = paramsForm.getFieldsValue();
            ${lfclassName}ListParams.current = current as unknown as string;
            ${lfclassName}ListParams.pageSize = "10";
            const res = await get${className}List(${lfclassName}ListParams);
            const listData:API.${upperModuleName}.${className}[] = res.data.rows as API.${upperModuleName}.${className}[]
            set${className}List(listData);
            setTotalCount(res.data.total);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
        }
    };

    const resetFormParams = () => {
        paramsForm.resetFields();
        update${className}List(1);
    }

    useEffect(() => {
        update${className}List(1);
    }, []);

    const rowSelection: TableRowSelection<API.${upperModuleName}.${className}> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRowKeys: \${selectedRowKeys}', 'selectedRows: ', selectedRows);
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

    const addBtnOnClick = ()=>{
        setEditDialogVisible(!editDialogVisible);
    }

    const onFinish: FormProps<API.${upperModuleName}.${className}ListParams>['onFinish'] = (values) => {
        console.log('Success:', values);
        update${className}List(currentPage)
    };

    const onFinishFailed: FormProps<API.${upperModuleName}.${className}ListParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns: TableColumnsType<API.${upperModuleName}.${className}> = [
    ${createCloumnList(columns)}
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
        <div>
            <Button
                type="link"
                size="small"
                key="edit"
                hidden={!access(userInfo).hasPerms('${moduleName}:${businessName}:edit')}
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
                            update${className}List(1);
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
                        ${createSearchFormItem(columns)}
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
                        <span className='text-1xl font-bold'>${functionName}</span>
                        <div className='flex flex-1 flex-row gap-5 items-end justify-end'>
                            <Button 
                              type="primary" 
                              className='w-button-primary' 
                              onClick={addBtnOnClick}
                              hidden={!access(userInfo).hasPerms('${moduleName}:${businessName}:add')}>
                              + 新建
                            </Button>
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
                                                update${className}List(currentPage);
                                            }
                                        },
                                        onCancel() {},
                                    });
                                }}>
                                    批量删除
                            </Button>
                            <Button type="primary" className='w-button-primary' onClick={handleExport}>+ 导出</Button>
                            <div className='w-fit h-fit text-[1.1rem] cursor-pointer hover:text-color-primary duration-300' onClick={()=>{update${className}List(currentPage)}}><SyncOutlined /></div>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col mt-5 w-full h-0 overflow-auto'>
                        <Table<API.${upperModuleName}.${className}>
                            rowSelection={rowSelection}
                            dataSource={${lfclassName}List}
                            columns={columns}
                            loading={loading}
                            sticky={true}
                            pagination={false}
                            rowKey="${pkField}"
                        >
                        </Table>
                        <div className='mt-4 w-full flex flex-col items-center'>
                            <Pagination  defaultCurrent={1} total={totalCount} onChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/*编辑弹窗 */}
            <Edit${className}
                onSubmit={async (values) => {
                    let success = false;
                    if (values.${pkField}) {
                        success = await handleUpdate({ ...values } as API.${upperModuleName}.${className});
                    } else {
                        success = await handleAdd({ ...values } as API.${upperModuleName}.${className});
                    }
                    if (success) {
                        setEditDialogVisible(false);
                        setCurrentRow(undefined);
                        //延迟获取数据，防止取不到最新的数据
                        setTimeout(() => {
                            update${className}List(currentPage);
                        }, 100);
                    }
                } }
                onCancel={() => {
                    setEditDialogVisible(false);
                    setCurrentRow(undefined);
                } }
                values={currentRow || {}}
                open={editDialogVisible} ${lfclassName}List={[]}            >
            </Edit${className}>
     </div>
    );
}
    `;

  function createCloumnList(columns:GenTableColumnEntity[]) {
    let str = ``;
    columns.forEach(item=>{
      if(item.isList != '1'){
        return
      }
      str += `
      {
        title:${`"${item.columnComment}"`},
        dataIndex: '${item.javaField}',
        key: '${item.javaField}',
      },
        `
    })
    return str;
  }

  function createSearchFormItem(columns:GenTableColumnEntity[]) {
    let str = ``;
    columns.forEach(item=>{
      if(item.isList != '1' || item.isQuery != '1'){
        return
      }
      str += `
      <Form.Item<API.${upperModuleName}.${className}>
          label="${item.columnComment}"
          name="${item.javaField}"
          rules={[{ required: ${item.isRequired?"true":"false"}, message: '请输入${item.columnComment}' }]}>
          ${createInputItem(item)}
      </Form.Item>
        `
    })
    return str;
  }

  function createInputItem(item:GenTableColumnEntity){
    let str = `<Input className='!w-64' allowClear/>`
    if(item.htmlType == 'select'){
      //todo
    }else{
      str=`<Input className='!w-64' allowClear/>`
    }
    return str
  }
};

