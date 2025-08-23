import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, TreeSelect, Select } from 'antd';
import _ from 'lodash';
import { DictValueEnumObj } from '@/components/DictTag';
import { DataNode } from 'antd/es/tree';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/es/select';

export type UserFormData = Record<string, unknown> & Partial<API.System.User>;

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormData) => void;
  onSubmit: (values: UserFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.User>;
  sexOptions: DictValueEnumObj[];
  postIds: string[];
  posts: DefaultOptionType[];
  roleIds: number[];
  roles: DefaultOptionType[];
  depts: DataNode[];
}

const { TextArea } = Input;

const EditUser: React.FC<UserFormProps> = (props) => {
    const [editUserForm] = Form.useForm();

    const userId = Form.useWatch('userId', editUserForm);
    const { sexOptions, } = props;
    const { roles, posts, depts, postIds} = props;
    
    const handleOk = () => {
        editUserForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.User>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as UserFormData);
    };

    const onFinishFailed: FormProps<API.System.User>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onDeptTreeChange = (value:string, label:string, extra:string) => {

    }

    const handlePostSelectChange = (value:string) => {

    }

    const handleRoleSelectChange = (value:string) => {

    }

    useEffect(() => {
        editUserForm.resetFields();
        if(props.values.userId != undefined){
            editUserForm.setFieldsValue({
                userId: props.values.userId,
                deptId: props.values.deptId,
                postIds: props.postIds,
                roleIds: props.roleIds,
                userName: props.values.userName,
                nickName: props.values.nickName,
                email: props.values.email,
                phonenumber: props.values.phonenumber,
                sex: props.values.sex,
                avatar: props.values.avatar,
                status: props.values.status,
                delFlag: props.values.delFlag,
                loginIp: props.values.loginIp,
                loginDate: props.values.loginDate,
                remark: props.values.remark,
            });
        }
    }, [editUserForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑岗位"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editUserForm}
                    name="editUserForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.User>
                        name="userId"
                        label="用户id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="用户昵称"
                                name="nickName"
                                rules={[{ required: true, message: '请输入用户昵称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入岗位名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="部门"
                                name="deptId"
                                rules={[{ required: true, message: '请选择部门' }]}
                                labelCol={{span: 6}}
                                >
                                    <TreeSelect
                                        showSearch
                                        style={{ width: '100%' }}
                                        styles={{
                                            popup: { root: { maxHeight: 400, overflow: 'auto' } },
                                        }}
                                        placeholder="请选择部门"
                                        allowClear
                                        treeDefaultExpandAll
                                        treeData={depts}
                                        />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="手机号码"
                                name="phonenumber"

                                rules={[{ required: false, message: '请输入手机号码' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入手机号码" type='phonenumber'/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="用户邮箱"
                                name="email"
                                rules={[{ required: false, message: '请输入用户邮箱' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入用户邮箱" type="email"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="用户账号"
                                name="userName"
                                rules={[{ required: true, message: '请输入用户邮箱' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入用户邮箱"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="用户密码"
                                name="password"
                                rules={[{ required: true, message: '请输入用户密码' }]}
                                labelCol={{span: 6}}
                                >
                                <Input.Password placeholder="请输入用户密码" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="用户性别"
                                name="sex"
                                rules={[{ required: false, message: '请输入用户性别' }]}
                                labelCol={{span: 6}}
                                >
                                <Select
                                    options={sexOptions}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.User>
                                label="账号状态"
                                name="status"
                                rules={[{ required: false, message: '请输入账号状态' }]}
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
                            <Form.Item
                                label="岗位"
                                name="postIds"
                                rules={[{ required: true, message: '请输入岗位' }]}
                                labelCol={{span: 6}}
                                >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    onChange={handlePostSelectChange}
                                    options={posts}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item
                                label="角色"
                                name="roleIds"
                                rules={[{ required: true, message: '请输入角色' }]}
                                labelCol={{span: 6}}
                                >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    onChange={handleRoleSelectChange}
                                    options={roles}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={24}>
                            <Form.Item<API.System.User>
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

export default EditUser;