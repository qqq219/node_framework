import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col } from 'antd';
import { DataNode } from 'antd/es/tree';
import type { FormProps } from 'antd';
import {TreeSelect  } from 'antd';
import type { TreeSelectProps } from 'antd';
import { Radio, Input } from "antd";
import {ProFormSelect} from '@ant-design/pro-components';
import { createIcon } from './IconUtil';
import IconSelector from "@/components/IconSelector"

export type MenuFormData = Record<string, unknown> & Partial<API.System.Menu>;

export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormData) => void;
  onSubmit: (values: MenuFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Menu>;
  menuTree: DataNode[];
}

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
          {
            value: 'leaf3',
            title: 'leaf3',
          },
          {
            value: 'leaf4',
            title: 'leaf4',
          },
          {
            value: 'leaf5',
            title: 'leaf5',
          },
          {
            value: 'leaf6',
            title: 'leaf6',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf11',
            title: <b style={{ color: '#08c' }}>leaf11</b>,
          },
        ],
      },
    ],
  },
];

const MenuForm: React.FC<MenuFormProps> = (props) => {
    const [form] = Form.useForm();

    const [menuTypeId, setMenuTypeId] = useState<any>('M');

    const [iconSelectorOpen, setIconSelectorOpen] = useState<boolean>(false);

    const [menuIconName, setMenuIconName] = useState<any>();

    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
    const handleFinish = async (values: Record<string, any>) => {
        props.onSubmit(values as MenuFormData);
    };
    const onFinish: FormProps<API.System.Menu>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<API.System.Menu>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [value, setValue] = useState<string>();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
        console.log('onPopupScroll', e);
    };

    useEffect(() => {
        form.resetFields();
        setMenuIconName(props.values.icon);
        form.setFieldsValue({
            menuId: props.values.menuId,
            menuName: props.values.menuName,
            orderNum: props.values.orderNum,
            path: props.values.path,
            status: props.values.status,
            icon: props.values.icon
        });
    }, [form, props]);

    return (
        <div>
            <Modal
                title="添加/编辑菜单"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={form}
                    name="editMenuForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.Menu>
                        label="上级菜单"
                        name="menuId"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={value}
                            styles={{
                                popup: { root: { maxHeight: 400, overflow: 'auto' } },
                            }}
                            placeholder="请选择上级菜单"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChange}
                            treeData={treeData}
                            onPopupScroll={onPopupScroll}
                        />
                    </Form.Item>
                    <Form.Item<API.System.Menu>
                        label="菜单类型"
                        name="menuName"
                        rules={[{ required: true, message: '!' }]}
                        >
                        <Radio.Group
                            value={value}
                            options={[
                            { value: 1, label: 'A' },
                            { value: 2, label: 'B' },
                            { value: 3, label: 'C' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<API.System.Menu>
                        label="菜单图标"
                        name="menuName"
                        rules={[{ required: true, message: '请输入菜单图标' }]}
                        >
                        <ProFormSelect
                            name="icon"
                            hidden={menuTypeId === 'F'}
                            addonBefore={createIcon(menuIconName)}
                            fieldProps={{
                                onClick: () => {
                                    setIconSelectorOpen(true);
                                },
                            }}
                            placeholder={'请输入'}
                            rules={[
                                {
                                required: false,
                                message: "请输入菜单图标"
                                },
                            ]}
                        />
                    </Form.Item>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="菜单名称"
                                name="menuName"
                                rules={[{ required: true, message: '请输入菜单名称' }]}
                                >
                                <Input placeholder="请输入菜单名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="显示顺序"
                                name="menuName"
                                rules={[{ required: true, message: '请输入显示顺序' }]}
                                >
                                <Input placeholder="请输入显示顺序" />
                            </Form.Item>
                        </Col> 
                    </Row>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="是否外链"
                                name="menuName"
                                rules={[{ required: true, message: '请选择是否外链' }]}
                                >
                                <Radio.Group
                                    value={value}
                                    options={[
                                    { value: 1, label: '是' },
                                    { value: 2, label: '否' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="路由地址"
                                name="menuName"
                                rules={[{ required: true, message: '请输入路由地址' }]}
                                >
                                <Input placeholder="请输入路由地址" />
                            </Form.Item>
                        </Col> 
                    </Row>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="显示状态"
                                name="menuName"
                                rules={[{ required: true, message: '请选择显示状态' }]}
                                >
                                <Radio.Group
                                    value={value}
                                    options={[
                                    { value: 1, label: '显示' },
                                    { value: 2, label: '隐藏' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="菜单状态"
                                name="menuName"
                                rules={[{ required: true, message: '请选择菜单状态' }]}
                                >
                                <Radio.Group
                                    value={value}
                                    options={[
                                    { value: 1, label: '正常' },
                                    { value: 2, label: '停用' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                    </Row>
                </Form>
                {/*icon选择弹窗 */}
                <Modal
                    className='!w-300 !h-300'
                    open={iconSelectorOpen}
                    onCancel={() => {
                        setIconSelectorOpen(false);
                    }}
                    footer={null}>
                    <IconSelector
                        onSelect={(name: string) => {
                            form.setFieldsValue({ icon: name });
                            setMenuIconName(name);
                            setIconSelectorOpen(false);
                        }}
                    />
                </Modal>
            </Modal>
        </div>
    );
}

export default MenuForm;