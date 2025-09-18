

/**
 * @author zhanjian
 */

import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';

export type SysLogininforFormData = Record<string, unknown> & Partial<API.System.SysLogininfor>;

export type SysLogininforFormProps = {
  onCancel: (flag?: boolean, formVals?: SysLogininforFormData) => void;
  onSubmit: (values: SysLogininforFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.SysLogininfor>;
  sysLogininforList: API.System.SysLogininfor[];
}

const EditSysLogininfor: React.FC<SysLogininforFormProps> = (props) => {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    
    const [editSysLogininforForm] = Form.useForm();
    
    const handleOk = () => {
        editSysLogininforForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.SysLogininfor>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as SysLogininforFormData);
    };

    const onFinishFailed: FormProps<API.System.SysLogininfor>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editSysLogininforForm.resetFields();
        if(props.values.infoId != undefined){
            editSysLogininforForm.setFieldsValue({
                
      infoId: props.values.infoId,
      userName: props.values.userName,
      ipaddr: props.values.ipaddr,
      loginLocation: props.values.loginLocation,
      browser: props.values.browser,
      os: props.values.os,
      status: props.values.status,
      msg: props.values.msg,
      loginTime: props.values.loginTime,
            });
        }
    }, [editSysLogininforForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑系统访问记录"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editSysLogininforForm}
                    name="editSysLogininforForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.SysLogininfor>
                        name="infoId"
                        label="infoId"
                        hidden={true}
                        >
                    </Form.Item>
                    <Row
                        gutter={24}>
                        
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="访问ID"
                name="infoId"
                rules={[{ required: true, message: '请输入访问ID' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入访问ID" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="用户账号"
                name="userName"
                rules={[{ required: true, message: '请输入用户账号' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入用户账号" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="登录IP地址"
                name="ipaddr"
                rules={[{ required: true, message: '请输入登录IP地址' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入登录IP地址" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="登录地点"
                name="loginLocation"
                rules={[{ required: true, message: '请输入登录地点' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入登录地点" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="浏览器类型"
                name="browser"
                rules={[{ required: true, message: '请输入浏览器类型' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入浏览器类型" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="操作系统"
                name="os"
                rules={[{ required: true, message: '请输入操作系统' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入操作系统" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="登录状态（0成功 1失败）"
                name="status"
                rules={[{ required: true, message: '请输入登录状态（0成功 1失败）' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入登录状态（0成功 1失败）" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="提示消息"
                name="msg"
                rules={[{ required: true, message: '请输入提示消息' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入提示消息" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysLogininfor>
                label="访问时间"
                name="loginTime"
                rules={[{ required: true, message: '请输入访问时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入访问时间" />
            </Form.Item>
        </Col>
      
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditSysLogininfor;

    