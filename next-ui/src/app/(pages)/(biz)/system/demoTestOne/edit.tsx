/**
 * @author zhanjian
 */

import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';

export type DemoTestOneFormData = Record<string, unknown> & Partial<API.System.DemoTestOne>;

export type DemoTestOneFormProps = {
  onCancel: (flag?: boolean, formVals?: DemoTestOneFormData) => void;
  onSubmit: (values: DemoTestOneFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.DemoTestOne>;
  demoTestOneList: API.System.DemoTestOne[];
}

const EditDemoTestOne: React.FC<DemoTestOneFormProps> = (props) => {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    
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
        if(props.values.testId != undefined){
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
                title="添加/编辑测试demo1"
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
                        name="testId"
                        label="testId"
                        hidden={true}
                        >
                    </Form.Item>
                    <Row
                        gutter={24}>
                        
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试id111"
                name="testId"
                rules={[{ required: true, message: '请输入测试id111' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试id111" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试名"
                name="testName"
                rules={[{ required: true, message: '请输入测试名' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试名" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试类型"
                name="testType"
                rules={[{ required: true, message: '请输入测试类型' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试类型" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="状态"
                name="status"
                rules={[{ required: true, message: '请输入状态' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入状态" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="测试内容"
                name="testContent"
                rules={[{ required: true, message: '请输入测试内容' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入测试内容" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="生效时间"
                name="startDate"
                rules={[{ required: true, message: '请输入生效时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入生效时间" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="备注"
                name="remark"
                rules={[{ required: true, message: '请输入备注' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入备注" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="创建者"
                name="createBy"
                rules={[{ required: true, message: '请输入创建者' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入创建者" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="创建时间"
                name="createTime"
                rules={[{ required: true, message: '请输入创建时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入创建时间" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="更新者"
                name="updateBy"
                rules={[{ required: true, message: '请输入更新者' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入更新者" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.DemoTestOne>
                label="更新时间"
                name="updateTime"
                rules={[{ required: true, message: '请输入更新时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入更新时间" />
            </Form.Item>
        </Col>
      
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditDemoTestOne;