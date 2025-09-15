

/**
 * @author zhanjian
 */

import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';

export type DemoTestOneFormData = Record<string, unknown> & Partial<API.System.DemoTestOne>;

export type DemoTestOneFormProps = {
  onCancel: (flag?: boolean, formVals?: DemoTestOneFormData) => void;
  onSubmit: (values: DemoTestOneFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.DemoTestOne>;
  demoTestOneList: API.System.DemoTestOne[];
}

const EditDemoTestOne: React.FC<DemoTestOneFormProps> = (props) => {
    const [editDemoTestOneForm] = Form.useForm();
    
    const handleOk = () => {
        editDemoTestOneForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.DemoTestOne>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as DemoTestOneFormData);
    };

    const onFinishFailed: FormProps<API.System.DemoTestOne>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editDemoTestOneForm.resetFields();
        if(props.values.demoTestOneId != undefined){
            editDemoTestOneForm.setFieldsValue({
                
      testId: props.values.testId,
      testName: props.values.testName,
      testType: props.values.testType,
      status: props.values.status,
      testContent: props.values.testContent,
      startDate: props.values.startDate,
      remark: props.values.remark,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
            });
        }
    }, [editDemoTestOneForm, props, props.open]);

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
                    form={editDemoTestOneForm}
                    name="editDemoTestOneForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.DemoTestOne>
                        name="demoTestOneId"
                        label="demoTestOneId"
                        hidden={true}
                        >
                    </Form.Item>
                    <Row
                        gutter={24}>
                        
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试id111"
                name="test_id"
                rules={[{ required: 0, message: '请输入测试id111' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试id111" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试名"
                name="test_name"
                rules={[{ required: 0, message: '请输入测试名' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试名" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试类型"
                name="test_type"
                rules={[{ required: 0, message: '请输入测试类型' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试类型" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="状态"
                name="status"
                rules={[{ required: 0, message: '请输入状态' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入状态" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试内容"
                name="test_content"
                rules={[{ required: 0, message: '请输入测试内容' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试内容" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="生效时间"
                name="start_date"
                rules={[{ required: 0, message: '请输入生效时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入生效时间" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="备注"
                name="remark"
                rules={[{ required: 0, message: '请输入备注' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入备注" />
            </Form.Item>
        </Col>
      
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditDemoTestOne;

    