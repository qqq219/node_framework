import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, TreeSelect } from 'antd';
import _ from 'lodash';
import { formatDeptTreeData } from '@/app/common/utils/tree';
import { DataNode } from 'antd/es/tree';

export type DeptFormData = Record<string, unknown> & Partial<API.System.Dept>;

export type DeptFormProps = {
  onCancel: (flag?: boolean, formVals?: DeptFormData) => void;
  onSubmit: (values: DeptFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Dept>;
  deptTree: API.System.Dept[];
}

const EditDept: React.FC<DeptFormProps> = (props) => {
    const [editDeptForm] = Form.useForm();

    const { deptTree } = props;
    const rootNode = { id: 0, key:0, label: "公司", children: [] as DataNode[], value: 0 };
    const formmatTreeData = formatDeptTreeData(deptTree);
    rootNode.children = formmatTreeData;
    const treeData: any = [];
    treeData.push(rootNode);
    
    const handleOk = () => {
        editDeptForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.Dept>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as DeptFormData);
    };

    const onFinishFailed: FormProps<API.System.Dept>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editDeptForm.resetFields();
        if(props.values.deptId != undefined){
            editDeptForm.setFieldsValue({
                deptId: props.values.deptId,
                parentId: props.values.parentId,
                ancestors: props.values.ancestors,
                deptName: props.values.deptName,
                orderNum: props.values.orderNum,
                leader: props.values.leader,
                phone: props.values.phone,
                email: props.values.email,
                status: props.values.status,
                delFlag: props.values.delFlag,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
            });
        }
    }, [editDeptForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑部门"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editDeptForm}
                    name="editDeptForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.Dept>
                        name="deptId"
                        label="部门id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={24}>
                            <Form.Item<API.System.Menu>
                                label="上级部门"
                                name="parentId"
                                rules={[{ required: true, message: '请选择上级部门' }]}
                                labelCol={{span: 3}}
                                initialValue={0}
                            >
                                <TreeSelect
                                    showSearch
                                    placeholder="请选择上级部门"
                                    allowClear
                                    treeData={treeData}
                                    styles={{
                                        popup: { root: { maxHeight: 200, overflow: 'auto' } },
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Dept>
                                label="部门名称"
                                name="deptName"
                                rules={[{ required: true, message: '请输入部门名称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入部门名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Dept>
                                label="显示顺序"
                                name="orderNum"
                                rules={[{ required: true, message: '请输入显示顺序' }]}
                                labelCol={{span: 6}}
                                initialValue={1}
                                >
                                <Input placeholder="请输入显示顺序" type='number' />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Dept>
                                label="负责人"
                                name="leader"
                                rules={[{ required: false, message: '请输入负责人' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入负责人"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Dept>
                                label="联系电话"
                                name="phone"
                                rules={[{ required: false, message: '请输入联系电话' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入联系电话"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Dept>
                                label="显示邮箱"
                                name="email"
                                rules={[{ required: false, message: '请输入显示邮箱' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入显示顺序" type='number'/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Dept>
                                label="部门状态"
                                name="status"
                                rules={[{ required: false, message: '请输入部门状态' }]}
                                initialValue={"0"}
                                labelCol={{span: 6}}
                                >
                                <Radio.Group
                                    options={[
                                        { value: "0", label: '正常' },
                                        { value: "1", label: '停用' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditDept;