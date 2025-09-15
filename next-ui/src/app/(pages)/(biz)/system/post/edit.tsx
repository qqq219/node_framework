import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';

export type PostFormData = Record<string, unknown> & Partial<API.System.Post>;

export type PostFormProps = {
  onCancel: (flag?: boolean, formVals?: PostFormData) => void;
  onSubmit: (values: PostFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Post>;
  postList: API.System.Post[];
}

const { TextArea } = Input;

const EditPost: React.FC<PostFormProps> = (props) => {
    const [editPostForm] = Form.useForm();
    
    const handleOk = () => {
        editPostForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.Post>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as PostFormData);
    };

    const onFinishFailed: FormProps<API.System.Post>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editPostForm.resetFields();
        if(props.values.postId != undefined){
            editPostForm.setFieldsValue({
                postId: props.values.postId,
                postName: props.values.postName,
                postSort: props.values.postSort,
                postCode: props.values.postCode,
                status: props.values.status,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
            });
        }
    }, [editPostForm, props, props.open]);

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
                    form={editPostForm}
                    name="editPostForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.Post>
                        name="postId"
                        label="岗位id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Post>
                                label="岗位名称"
                                name="postName"
                                rules={[{ required: true, message: '请输入岗位名称' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入岗位名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Post>
                                label="显示顺序"
                                name="postSort"
                                rules={[{ required: true, message: '请输入显示顺序' }]}
                                labelCol={{span: 6}}
                                initialValue={1}
                                >
                                <Input placeholder="请输入显示顺序" type='number' />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Post>
                                label="岗位编码"
                                name="postCode"
                                rules={[{ required: true, message: '请输入岗位编码' }]}
                                labelCol={{span: 6}}
                                >
                                <Input placeholder="请输入岗位编码"/>
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Post>
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
                        <Col span={24}>
                            <Form.Item<API.System.Post>
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

export default EditPost;