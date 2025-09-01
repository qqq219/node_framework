import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, Select } from 'antd';
import _ from 'lodash';

export type DictDataFormData = Record<string, unknown> & Partial<API.System.DictData>;

export type DictDataFormProps = {
  onCancel: (flag?: boolean, formVals?: DictDataFormData) => void;
  onSubmit: (values: DictDataFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.DictData>;
  dicttype: API.System.DictType | undefined;
}

const { TextArea } = Input;

const EditDictData: React.FC<DictDataFormProps> = (props) => {
    const [editDictDataForm] = Form.useForm();

    const { dicttype } = props;
    
    const handleOk = () => {
        editDictDataForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.DictData>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as DictDataFormData);
    };

    const onFinishFailed: FormProps<API.System.DictData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editDictDataForm.resetFields();
        if(props.values.dictCode != undefined){
            editDictDataForm.setFieldsValue({
                dictCode: props.values.dictCode,
                dictSort: props.values.dictSort,
                dictLabel: props.values.dictLabel,
                dictValue: props.values.dictValue,
                dictType: props.values.dictType,
                cssClass: props.values.cssClass,
                listClass: props.values.listClass,
                isDefault: props.values.isDefault,
                isNumber: props.values.isNumber,
                status: props.values.status,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
                remark: props.values.remark,
            });
        }
        else{
            if(dicttype != undefined){
                editDictDataForm.setFieldsValue({
                    dictType: dicttype.dictType
                });
            }
        }
    }, [editDictDataForm, props, props.open]);

    return (
        <div>
            <Modal
                title={"编辑字典:" + dicttype?.dictName}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editDictDataForm}
                    name="editDictDataForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.DictData>
                        name="dictCode"
                        label="字典键值code"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="字典类型"
                                name="dictType"
                                rules={[{ required: false, message: '请输入字典类型' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请选择" disabled/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="字典标签"
                                name="dictLabel"
                                rules={[{ required: false, message: '请输入字典标签' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入字典标签"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="字典键值"
                                name="dictValue"
                                rules={[{ required: false, message: '请输入字典键值' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入字典键值"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="样式属性"
                                name="cssClass"
                                rules={[{ required: false, message: '请输入样式属性' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入样式属性"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="回显样式"
                                name="listClass"
                                rules={[{ required: false, message: '请选择回显样式' }]}
                                labelCol={{span: 6}}
                                initialValue={"default"}
                                >
                                <Select
                                    showSearch
                                    placeholder="请选择回显样式"
                                    options={[
                                        { value: 'default', label: '默认' },
                                        { value: 'primary', label: '主要' },
                                        { value: 'success', label: '成功' },
                                        { value: 'info', label: '信息' },
                                        { value: 'warning', label: '警告' },
                                        { value: 'danger', label: '危险' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="字典排序"
                                name="dictSort"
                                rules={[{ required: false, message: '请输入字典排序' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入字典排序" type='number'/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="返回值转数字"
                                name="isNumber"
                                rules={[{ required: false, message: '请选择' }]}
                                initialValue={"N"}
                                labelCol={{span: 6}}
                                >
                                <Radio.Group
                                    options={[
                                        { value: "Y", label: '是' },
                                        { value: "N", label: '否' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="是否默认"
                                name="isDefault"
                                rules={[{ required: false, message: '请选择' }]}
                                initialValue={"N"}
                                labelCol={{span: 6}}
                                >
                                <Radio.Group
                                    options={[
                                        { value: "Y", label: '是' },
                                        { value: "N", label: '否' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.DictData>
                                label="状态"
                                name="status"
                                rules={[{ required: false, message: '请输入状态' }]}
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
                            <Form.Item<API.System.DictData>
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

export default EditDictData;