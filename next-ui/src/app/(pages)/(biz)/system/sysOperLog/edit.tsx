

/**
 * @author zhanjian
 */

import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';

export type SysOperLogFormData = Record<string, unknown> & Partial<API.System.SysOperLog>;

export type SysOperLogFormProps = {
  onCancel: (flag?: boolean, formVals?: SysOperLogFormData) => void;
  onSubmit: (values: SysOperLogFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.SysOperLog>;
  sysOperLogList: API.System.SysOperLog[];
}

const EditSysOperLog: React.FC<SysOperLogFormProps> = (props) => {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    
    const [editSysOperLogForm] = Form.useForm();
    
    const handleOk = () => {
        editSysOperLogForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.SysOperLog>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as SysOperLogFormData);
    };

    const onFinishFailed: FormProps<API.System.SysOperLog>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editSysOperLogForm.resetFields();
        if(props.values.operId != undefined){
            editSysOperLogForm.setFieldsValue({
                
      operId: props.values.operId,
      title: props.values.title,
      businessType: props.values.businessType,
      method: props.values.method,
      requestMethod: props.values.requestMethod,
      operatorType: props.values.operatorType,
      operName: props.values.operName,
      deptName: props.values.deptName,
      operUrl: props.values.operUrl,
      operIp: props.values.operIp,
      operLocation: props.values.operLocation,
      operParam: props.values.operParam,
      jsonResult: props.values.jsonResult,
      status: props.values.status,
      errorMsg: props.values.errorMsg,
      operTime: props.values.operTime,
      costTime: props.values.costTime,
            });
        }
    }, [editSysOperLogForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑操作日志记录"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editSysOperLogForm}
                    name="editSysOperLogForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.SysOperLog>
                        name="operId"
                        label="operId"
                        hidden={true}
                        >
                    </Form.Item>
                    <Row
                        gutter={24}>
                        
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="日志主键"
                name="operId"
                rules={[{ required: true, message: '请输入日志主键' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入日志主键" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="模块标题"
                name="title"
                rules={[{ required: true, message: '请输入模块标题' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入模块标题" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="业务类型（0其它 1新增 2修改 3删除）"
                name="businessType"
                rules={[{ required: true, message: '请输入业务类型（0其它 1新增 2修改 3删除）' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入业务类型（0其它 1新增 2修改 3删除）" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="方法名称"
                name="method"
                rules={[{ required: true, message: '请输入方法名称' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入方法名称" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="请求方式"
                name="requestMethod"
                rules={[{ required: true, message: '请输入请求方式' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入请求方式" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="操作类别（0其它 1后台用户 2手机端用户）"
                name="operatorType"
                rules={[{ required: true, message: '请输入操作类别（0其它 1后台用户 2手机端用户）' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入操作类别（0其它 1后台用户 2手机端用户）" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="操作人员"
                name="operName"
                rules={[{ required: true, message: '请输入操作人员' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入操作人员" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="部门名称"
                name="deptName"
                rules={[{ required: true, message: '请输入部门名称' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入部门名称" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="请求URL"
                name="operUrl"
                rules={[{ required: true, message: '请输入请求URL' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入请求URL" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="主机地址"
                name="operIp"
                rules={[{ required: true, message: '请输入主机地址' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入主机地址" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="操作地点"
                name="operLocation"
                rules={[{ required: true, message: '请输入操作地点' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入操作地点" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="请求参数"
                name="operParam"
                rules={[{ required: true, message: '请输入请求参数' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入请求参数" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="返回参数"
                name="jsonResult"
                rules={[{ required: true, message: '请输入返回参数' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入返回参数" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="操作状态（0正常 1异常）"
                name="status"
                rules={[{ required: true, message: '请输入操作状态（0正常 1异常）' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入操作状态（0正常 1异常）" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="错误消息"
                name="errorMsg"
                rules={[{ required: true, message: '请输入错误消息' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入错误消息" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="操作时间"
                name="operTime"
                rules={[{ required: true, message: '请输入操作时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入操作时间" />
            </Form.Item>
        </Col>
      
        <Col span={12}>
            <Form.Item<API.System.SysOperLog>
                label="消耗时间"
                name="costTime"
                rules={[{ required: true, message: '请输入消耗时间' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入消耗时间" />
            </Form.Item>
        </Col>
      
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditSysOperLog;

    