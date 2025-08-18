import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';
import _ from 'lodash';

export type ConfigFormData = Record<string, unknown> & Partial<API.System.Config>;

export type ConfigFormProps = {
  onCancel: (flag?: boolean, formVals?: ConfigFormData) => void;
  onSubmit: (values: ConfigFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Config>;
  configList: API.System.Config[];
}

const { TextArea } = Input;

const EditConfig: React.FC<ConfigFormProps> = (props) => {
    const [editConfigForm] = Form.useForm();

    const { configList } = props;
    
    const handleOk = () => {
        editConfigForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.Config>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as ConfigFormData);
    };

    const onFinishFailed: FormProps<API.System.Config>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editConfigForm.resetFields();
        if(props.values.configId != undefined){
            editConfigForm.setFieldsValue({
                configId: props.values.configId,
                configName: props.values.configName,
                configKey: props.values.configKey,
                configValue: props.values.configValue,
                configType: props.values.configType,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
                remark: props.values.remark,
            });
        }
    }, [editConfigForm, props, props.open]);

    return (
        <div>
            <Modal
                title="参数配置"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editConfigForm}
                    name="editConfigForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.Config>
                        name="configId"
                        label="参数id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Config>
                                label="参数名称"
                                name="configName"
                                rules={[{ required: false, message: '请输入参数名称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入参数名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Config>
                                label="参数键名"
                                name="configKey"
                                rules={[{ required: false, message: '请输入参数键名' }]}
                                labelCol={{span: 6}}
                                initialValue={1}
                                >
                                <Input placeholder="请输入参数键名"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Config>
                                label="参数键值"
                                name="configKey"
                                rules={[{ required: false, message: '请输入参数键值' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入参数键值"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Config>
                                label="系统内置"
                                name="configType"
                                rules={[{ required: false, message: '请输入系统内置' }]}
                                initialValue={"N"}
                                labelCol={{span: 6}}
                                >
                                <Radio.Group
                                    options={[
                                        { value: "Y", label: '正常' },
                                        { value: "N", label: '停用' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={24}>
                            <Form.Item<API.System.Config>
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

export default EditConfig;