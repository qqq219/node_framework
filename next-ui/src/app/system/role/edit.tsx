import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, TreeSelect } from 'antd';
import _ from 'lodash';
import { DataNode } from 'antd/es/tree';
import { DictValueEnumObj } from '@/components/DictTag';

export type RoleFormData = Record<string, unknown> & Partial<API.System.Role>;

export type RoleFormProps = {
  onCancel: (flag?: boolean, formVals?: RoleFormData) => void;
  onSubmit: (values: RoleFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Role>;
  menuTree: DataNode[];
  menuCheckedKeys: number[];
  statusOptions: DictValueEnumObj;
}

const { TextArea } = Input;

const EditRole: React.FC<RoleFormProps> = (props) => {
    const [editRoleForm] = Form.useForm();
    const { menuTree, menuCheckedKeys } = props;
    console.log(JSON.stringify(menuCheckedKeys));
    const [ menuIds, setMenuIds] = useState<number[]>(menuCheckedKeys);
    const { statusOptions } = props;
    
    const handleOk = () => {
        editRoleForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };

    const menuIdTreeOnchange = (value:any, label:any, extra:any) => {
        setMenuIds(value)
    };
 
    const onFinish: FormProps<API.System.Role>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit({ ...values, menuIds } as RoleFormData);
    };

    const onFinishFailed: FormProps<API.System.Role>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editRoleForm.resetFields();
        if(props.values.roleId != undefined){
            editRoleForm.setFieldsValue({
                roleId: props.values.roleId,
                roleName: props.values.roleName,
                roleKey: props.values.roleKey,
                roleSort: props.values.roleSort,
                dataScope: props.values.dataScope,
                menuCheckStrictly: props.values.menuCheckStrictly,
                deptCheckStrictly: props.values.deptCheckStrictly,
                status: props.values.status,
                delFlag: props.values.delFlag,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
                remark: props.values.remark,
                menuIds:menuCheckedKeys
            });
        }
    }, [editRoleForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑角色"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editRoleForm}
                    name="editRoleForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        <Col span={12}>
                            <Form.Item<API.System.Role>
                                label="角色名称"
                                name="roleName"
                                rules={[{ required: true, message: '请输入角色名称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入角色名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Role>
                                label="权限字符"
                                name="roleKey"
                                rules={[{ required: true, message: '请输入权限字符' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入权限字符"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Role>
                                label="显示顺序"
                                name="roleSort"
                                rules={[{ required: true, message: '请输入显示顺序' }]}
                                labelCol={{span: 6}}
                                initialValue={1}
                                >
                                <Input placeholder="请输入显示顺序" type='number'/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Role>
                                label="角色状态"
                                name="status"
                                rules={[{ required: false, message: '请输入角色状态' }]}
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
                        <Col span={12}>
                            <Form.Item<API.System.Role>
                                label="角色状态"
                                name="status"
                                rules={[{ required: false, message: '请输入角色状态' }]}
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
                        <Col span={24}>
                            <Form.Item
                                label="菜单权限"
                                name="menuIds"
                                rules={[{ required: false, message: '请输入角色状态' }]}
                                labelCol={{span: 3}}
                                >
                                <TreeSelect 
                                    treeCheckable
                                    showSearch
                                    multiple
                                    style={{ width: '100%' }}
                                    placeholder="请选择"
                                    allowClear
                                    showCheckedStrategy={TreeSelect.SHOW_CHILD}
                                    onChange={menuIdTreeOnchange}
                                    treeData={menuTree}
                                    value={menuIds}
                                >
                                </TreeSelect>
                            </Form.Item>
                        </Col> 
                        <Col span={24}>
                            <Form.Item<API.System.Role>
                                label="备注"
                                name="remark"
                                rules={[{ required: false, message: '请输入备注' }]}
                                labelCol={{span: 3}}
                                >
                                 <TextArea rows={4} placeholder="备注" maxLength={2048} />
                            </Form.Item>
                        </Col> 
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditRole;