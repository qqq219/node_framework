import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, TreeSelect, Select } from 'antd';
import _ from 'lodash';
import { DataNode } from 'antd/es/tree';
// @ts-ignore
import { CheckboxValueType } from 'antd/es/checkbox/Group';

export type FormValueType = any & Partial<API.System.Dept>;

export type DataScopeFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    open: boolean;
    values: Partial<API.System.Role>;
    deptTree: DataNode[];
    deptCheckedKeys: number[];
};

const { TextArea } = Input;

const DataScopeEdit: React.FC<DataScopeFormProps> = (props) => {
     const [datraScopeForm] = Form.useForm();

    const { deptTree, deptCheckedKeys } = props;
    const [dataScopeType, setDataScopeType] = useState<string>('1');
    const [deptIds, setDeptIds] = useState<number[] | {checked: number[], halfChecked: number[]}>([]);


    useEffect(() => {
        datraScopeForm.resetFields();
            console.log("jinjian===>deptCheckedKeys:" + deptCheckedKeys)
        datraScopeForm.setFieldsValue({
            roleId: props.values.roleId,
            roleName: props.values.roleName,
            roleKey: props.values.roleKey,
            dataScope: props.values.dataScope,
            deptIds:deptCheckedKeys
        });
        setDataScopeType(props.values.dataScope?props.values.dataScope:'1');
    });

    const handleOk = () => {
        datraScopeForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
    const handleFinish = async (values: Record<string, any>) => {
        props.onSubmit({ ...values, deptIds } as FormValueType);
    };

    const deptTreeOnchange = (value:any, label:any, extra:any) => {
        setDeptIds(value)
    };

    return (
        <div>
            <Modal
                title="编辑数据权限"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={datraScopeForm}
                    name="datraScopeForm"
                    onFinish={handleFinish}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.Role>
                        name="roleId"
                        label="角色id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={24}>
                            <Form.Item<API.System.Role>
                                label="角色名称"
                                name="roleName"
                                rules={[{ required: true, message: '请输入角色名称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入角色名称" disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item<API.System.Role>
                                label="权限字符"
                                name="roleKey"
                                rules={[{ required: true, message: '请输入权限字符' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入权限字符" disabled/>
                            </Form.Item>
                        </Col> 
                        <Col span={24}>
                            <Form.Item<API.System.Role>
                                label="全部数据权限"
                                name="dataScope"
                                rules={[{ required: true, message: '请输入全部数据权限' }]}
                                labelCol={{span: 6}}
                                initialValue={'1'}
                                >
                                <Select  
                                    placeholder="请输入全部数据权限"
                                    onChange={(value:any)=>{setDataScopeType(value)}}
                                    options={[
                                    {
                                        value: '1',
                                        label: '全部数据权限',
                                    },
                                    {
                                        value: '2',
                                        label: '自定数据权限',
                                    },
                                    {
                                        value: '3',
                                        label: '本部门数据权限',
                                    },
                                    {
                                        value: '4',
                                        label: '本部门及以下数据权限',
                                    },
                                    {
                                        value: '5',
                                        label: '仅本人数据权限',
                                    },
                                    ]}>
                                </Select>
                            </Form.Item>
                        </Col> 
                        <Col span={24}>
                            <Form.Item
                                label="部门权限"
                                name="deptIds"
                                rules={[{ required: true, message: '请部门权限' }]}
                                labelCol={{span: 6}}
                                hidden={dataScopeType !== '1'}
                                required={dataScopeType === '1'}
                                >
                                <TreeSelect 
                                    treeCheckable
                                    showSearch
                                    multiple
                                    style={{ width: '100%' }}
                                    placeholder="请选择"
                                    allowClear
                                    showCheckedStrategy={TreeSelect.SHOW_CHILD}
                                    onChange={deptTreeOnchange}
                                    treeData={deptTree}
                                    value={deptIds}
                                >
                                </TreeSelect>
                            </Form.Item>
                        </Col> 
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default DataScopeEdit;