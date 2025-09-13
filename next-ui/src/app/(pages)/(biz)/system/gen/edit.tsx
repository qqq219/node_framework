import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, Tabs, message, TreeSelect, Select } from 'antd';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import ColumnInfo from './ColumnInfo';
import { getMenuList, getMenuTree, getRouterList } from '@/app/services/menu';
import { getGenCode } from '@/app/services/gen';
import { buildTreeData, formatRoleMenuTreeData, formatRouterSelectorTreeData, formatTreeData } from '@/app/common/utils/tree';
import { getDictTypeList } from '@/app/services/dict';

export type GenFormData = Record<string, unknown> & Partial<API.System.GenCodeType>;

export type GenFormProps = {
  onCancel: (flag?: boolean, formVals?: GenFormData) => void;
  onSubmit: (values: GenFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.GenCodeType>;
}

const EditGen: React.FC<GenFormProps> = (props) => {
    const [editGenForm] = Form.useForm();
    const {tableId} = props.values;
    const [columnData, setColumnData] = useState<any>([]);
    const [menuTree, setMenuTree] = useState<any>([]);
    const [parentMenuId, setParentMenuId]  = useState<any>([]);
    const [dictData, setDictData] = useState<any>([]);

    const handleOk = () => {
        editGenForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.GenCodeType>['onFinish'] = (values) => {
        const postData: API.System.GenCodeType = {
          ...values,
          columns:columnData,
          tableId: tableId as unknown as string,
          options:JSON.stringify(values)
        };
        props.onSubmit(postData as GenFormData);
    };

    const onFinishFailed: FormProps<API.System.GenCodeType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (newValue: string) => {
        setParentMenuId(newValue);
    };

    useEffect(() => {
        editGenForm.resetFields();
        if(!tableId){
            return;
        }
        getGenCode(tableId).then((res) => {
            if (res.data.code === 200) {
                editGenForm.setFieldsValue({
                    tableName: res.data.data.info.tableName,
                    tableComment: res.data.data.info.tableComment,
                    className: res.data.data.info.className,
                    functionAuthor: res.data.data.info.functionAuthor,
                    remark: res.data.data.info.remark,
                    tplCategory: res.data.data.info.tplCategory,
                    packageName: res.data.data.info.packageName,
                    moduleName: res.data.data.info.moduleName,
                    businessName: res.data.data.info.businessName,
                    functionName: res.data.data.info.functionName,
                    parentMenuId: res.data.data.info.parentMenuId,
                });
                setColumnData(res.data.data.rows);
            } else {
                // message.error(res.data.msg);
            }
        });
        getRouterList().then(async (res) => {
            if (res.data.code === 200) {
                const routerTree = formatRouterSelectorTreeData(buildTreeData(res.data.data, 'menuId', 'menuName', '', '', ''));
                setMenuTree(routerTree);
            } else {
                message.error(res.data.msg);
            }
        });

        getDictTypeList().then((res: any) => {
            if (res.data.code === 200) {
                const dicts = res.data.rows.map((item: any) => {
                return {
                    label: item.dictName,
                    value: item.dictType,
                };
                });
                setDictData(dicts);
            } else {
                message.error(res.data.msg);
            }
        });
        
    }, [editGenForm, props, props.open]);

    return (
        <div>
            <Modal
                title="代码生成配置"
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-500'
                okText="确认"
                cancelText="取消"
                >
                <Form
                    form={editGenForm}
                    name="editGenForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Tabs
                        type="card"
                        items={[
                            {
                                label: `基本信息`,
                                key: "1",
                                children: 
                                    <div>
                                        <Row
                                            gutter={24}>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="表名称"
                                                    name="tableName"
                                                    rules={[{ required: true, message: '请输入表名称' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入表名称" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="表描述"
                                                    name="tableComment"
                                                    rules={[{ required: true, message: '请输入表描述' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入表描述" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row
                                            gutter={24}>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="实体类名称"
                                                    name="className"
                                                    rules={[{ required: true, message: '请输入实体类名称' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入实体类名称" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="作者"
                                                    name="functionAuthor"
                                                    rules={[{ required: true, message: '请输入作者' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入作者" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row
                                            gutter={12}>
                                            <Col span={24}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="备注"
                                                    name="remark"
                                                    rules={[{ required: true, message: '请输入备注' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <TextArea  rows={4} placeholder="请输入备注" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                            },
                            {
                                label: `字段信息`,
                                key: "2",
                                children: 
                                <ColumnInfo
                                    data={columnData}
                                    dictData={dictData}
                                    updateColumnData={setColumnData}
                                />,
                            },
                            {
                                label: `生成信息`,
                                key: "3",
                                children: 
                                 <div>
                                        <Row
                                            gutter={24}>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="生成模版"
                                                    name="tplCategory"
                                                    rules={[{ required: true, message: '请输入生成模版' }]}
                                                    labelCol={{span: 3}}
                                                    initialValue={"crud"}
                                                    >
                                                    <Select
                                                        options={[
                                                            { value: 'crud', label: '默认模版' },
                                                        ]}
                                                        />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="生成包路径"
                                                    name="packageName"
                                                    rules={[{ required: true, message: '请输入生成包路径' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入生成包路径" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row
                                            gutter={24}>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="生成模块名"
                                                    name="moduleName"
                                                    rules={[{ required: true, message: '请输入模块名' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入模块名" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="生成业务名"
                                                    name="businessName"
                                                    rules={[{ required: true, message: '请输入业务名' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入业务名" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row
                                            gutter={24}>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="生成功能描述"
                                                    name="functionName"
                                                    rules={[{ required: true, message: '请输入功能描述' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <Input placeholder="请输入功能描述" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item<API.System.GenCodeType>
                                                    label="父菜单"
                                                    name="parentMenuId"
                                                    rules={[{ required: true, message: '请选择父菜单' }]}
                                                    labelCol={{span: 3}}
                                                    >
                                                    <TreeSelect
                                                        style={{ width: '100%' }}
                                                        styles={{
                                                            popup: { root: { maxHeight: 400, overflow: 'auto' } },
                                                        }}
                                                        placeholder="请选择父菜单"
                                                        allowClear
                                                        treeDefaultExpandAll
                                                        onChange={onChange}
                                                        treeData={menuTree}
                                                        />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>,
                            }
                        ]}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default EditGen;