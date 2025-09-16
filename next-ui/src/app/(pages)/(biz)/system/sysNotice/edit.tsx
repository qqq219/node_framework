

/**
 * @author zhanjian
 */

import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input, Select } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';

export type SysNoticeFormData = Record<string, unknown> & Partial<API.System.SysNotice>;

const { TextArea } = Input;

export type SysNoticeFormProps = {
  onCancel: (flag?: boolean, formVals?: SysNoticeFormData) => void;
  onSubmit: (values: SysNoticeFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.SysNotice>;
  sysNoticeList: API.System.SysNotice[];
}

const EditSysNotice: React.FC<SysNoticeFormProps> = (props) => {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    
    const [editSysNoticeForm] = Form.useForm();
    
    const handleOk = () => {
        editSysNoticeForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.SysNotice>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as SysNoticeFormData);
    };

    const onFinishFailed: FormProps<API.System.SysNotice>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editSysNoticeForm.resetFields();
        if(props.values.noticeId != undefined){
            editSysNoticeForm.setFieldsValue({
                
            noticeId: props.values.noticeId,
            noticeTitle: props.values.noticeTitle,
            noticeType: props.values.noticeType,
            noticeContent: props.values.noticeContent,
            status: props.values.status,
            remark: props.values.remark,
            createBy: props.values.createBy,
            createTime: props.values.createTime,
            updateBy: props.values.updateBy,
            updateTime: props.values.updateTime,
            });
        }
    }, [editSysNoticeForm, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑通知公告表"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={editSysNoticeForm}
                    name="editSysNoticeForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.SysNotice>
                        name="noticeId"
                        label="noticeId"
                        hidden={true}
                        >
                    </Form.Item>
                    <Row
                        gutter={24}>
      
        <Col span={24}>
            <Form.Item<API.System.SysNotice>
                label="公告标题"
                name="noticeTitle"
                rules={[{ required: true, message: '请输入公告标题' }]}
                labelCol={{span: 3}}
                >
                <Input placeholder="请输入公告标题" />
            </Form.Item>
        </Col>
      
        <Col span={24}>
            <Form.Item<API.System.SysNotice>
                label="公告类型"
                name="noticeType"
                rules={[{ required: true, message: '请输入公告类型' }]}
                labelCol={{span: 3}}
                >
                <Select
                    options={[
                        { value: '1', label: '通知' },
                        { value: '2', label: '公告' },
                    ]}
                    />
            </Form.Item>
        </Col>
      
        <Col span={24}>
            <Form.Item<API.System.SysNotice>
                label="公告内容"
                name="noticeContent"
                rules={[{ required: true, message: '请输入公告内容' }]}
                labelCol={{span: 3}}
                >
                <TextArea rows={2} placeholder="请输入公告内容" />
            </Form.Item>
        </Col>
      
        <Col span={24}>
            <Form.Item<API.System.SysNotice>
                label="公告状态"
                name="status"
                rules={[{ required: true, message: '请输入公告状态' }]}
                labelCol={{span: 3}}
                >
                <Select
                    options={[
                        { value: '0', label: '正常' },
                        { value: '1', label: '关闭' },
                    ]}
                    />
            </Form.Item>
        </Col>
      
        <Col span={24}>
            <Form.Item<API.System.SysNotice>
                label="备注"
                name="remark"
                rules={[{ required: false, message: '请输入备注' }]}
                labelCol={{span: 3}}
                >
                <TextArea rows={4} placeholder="请输入备注" />
            </Form.Item>
        </Col>
      
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default EditSysNotice;

    