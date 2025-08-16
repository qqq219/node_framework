import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';
import _ from 'lodash';

export type DictTypeFormData = Record<string, unknown> & Partial<API.System.DictType>;

export type DictTypeFormProps = {
  onCancel: (flag?: boolean, formVals?: DictTypeFormData) => void;
  onSubmit: (values: DictTypeFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.DictType>;
  dictTypeList: API.System.DictType[];
}

const { TextArea } = Input;

const EditDictType: React.FC<DictTypeFormProps> = (props) => {
    const [editDictTypeForm] = Form.useForm();
    
    const handleOk = () => {
        editDictTypeForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.DictType>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as DictTypeFormData);
    };

    const onFinishFailed: FormProps<API.System.DictType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editDictTypeForm.resetFields();
        if(props.values.dictId != undefined){
            editDictTypeForm.setFieldsValue({
                dictId: props.values.dictId,
                dictName: props.values.dictName,
                dictType: props.values.dictType,
                status: props.values.status,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
                remark: props.values.remark,
            });
        }
    }, [editDictTypeForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑字典类型"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editDictTypeForm}
                    name="editDictTypeForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.DictType>
                        name="dictId"
                        label="字典类型id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.DictType>
                                label="字典名称"
                                name="dictName"
                                rules={[{ required: true, message: '请输入字典名称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入字典名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.DictType>
                                label="字典类型"
                                name="dictType"
                                rules={[{ required: true, message: '请输入字典类型' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入字典类型" />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictType>
                                label="状态"
                                name="status"
                                rules={[{ required: false, message: '请选择状态' }]}
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
                            <Form.Item<API.System.DictType>
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

export default EditDictType;