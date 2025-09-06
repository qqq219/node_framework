import React, { useState, useEffect } from 'react';
import { Modal,Form,Row,Col } from 'antd';
import { DataNode } from 'antd/es/tree';
import type { FormProps } from 'antd';
import {TreeSelect  } from 'antd';
import type { TreeSelectProps } from 'antd';
import { Radio, Input } from "antd";
import {ProFormSelect} from '@ant-design/pro-components';
import IconSelector from "@/components/IconSelector"
import _ from 'lodash';
import { formatTreeData } from '@/app/common/utils/tree';
import { createIcon } from '@/app/common/utils/IconUtil';

export type MenuFormData = Record<string, unknown> & Partial<API.System.Menu>;

export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormData) => void;
  onSubmit: (values: MenuFormData) => Promise<void>;
  open: boolean;
  values: Partial<API.System.Menu>;
  menuTree: API.System.Menu[];
}

const MenuForm: React.FC<MenuFormProps> = (props) => {
    const [editMenuForm] = Form.useForm();

    const [menuTypeId, setMenuTypeId] = useState<any>('M');

    const [iconSelectorOpen, setIconSelectorOpen] = useState<boolean>(false);

    const [menuIconName, setMenuIconName] = useState<any>();

    const { menuTree } = props;

    const rootMenu = { id: 0, key:0, label: "主类目", children: [] as DataNode[], value: 0 };
    const formmatTreeData = formatTreeData(menuTree);
    rootMenu.children = formmatTreeData;
    const treeData: any = [];
    treeData.push(rootMenu);

    const handleOk = () => {
        editMenuForm.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.System.Menu>['onFinish'] = (values) => {
        console.log('Success:', values);
         props.onSubmit(values as MenuFormData);
    };

    const onFinishFailed: FormProps<API.System.Menu>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        editMenuForm.resetFields();
        setMenuIconName(props.values.icon);
        if(props.values.menuId != undefined){
            setMenuTypeId(props.values.menuType);
            editMenuForm.setFieldsValue({
                menuId: props.values.menuId,
                menuName: props.values.menuName,
                parentId: props.values.parentId,
                orderNum: props.values.orderNum,
                path: props.values.path,
                component: props.values.component,
                query: props.values.query,
                isFrame: props.values.isFrame,
                isCache: props.values.isCache,
                menuType: props.values.menuType,
                visible: props.values.visible,
                status: props.values.status,
                perms: props.values.perms,
                icon: props.values.icon,
                createBy: props.values.createBy,
                createTime: props.values.createTime,
                updateBy: props.values.updateBy,
                updateTime: props.values.updateTime,
                remark: props.values.remark,
            });
        }
        else{
            setMenuTypeId("M");
        }
    }, [editMenuForm, props, props.open]);

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
                    form={editMenuForm}
                    name="editMenuForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.System.Menu>
                        name="menuId"
                        label="菜单id"
                        hidden={true}
                        >
                    <input></input>
                    </Form.Item>
                    <Form.Item<API.System.Menu>
                        label="上级菜单"
                        name="parentId"
                        rules={[{ required: true, message: '请选择上级菜单' }]}
                        initialValue={0}
                    >
                        <TreeSelect
                            showSearch
                            defaultValue={"0"}
                            placeholder="请选择上级菜单"
                            allowClear
                            treeData={treeData}
                            styles={{
                                popup: { root: { maxHeight: 200, overflow: 'auto' } },
                            }}
                        />
                    </Form.Item>
                    <Form.Item<API.System.Menu>
                        label="菜单类型"
                        name="menuType"
                        rules={[{ required: true, message: '请选择菜单类型' }]}
                        initialValue={"M"}
                        >
                        <Radio.Group
                            defaultValue={"M"}
                            onChange={(e)=>{setMenuTypeId(e.target.value)}}
                            options={[
                                { value: "M", label: '目录' },
                                { value: "C", label: '菜单' },
                                { value: "F", label: '按钮' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<API.System.Menu>
                        label="菜单图标"
                        name="icon"
                        rules={[{ required: false, message: '请输入菜单图标' }]}
                        hidden={menuTypeId === 'F'}
                        className='h-9'
                        >
                        <ProFormSelect
                            name="icon"
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
                                name="orderNum"
                                rules={[{ required: false, message: '请输入显示顺序' }]}
                                initialValue={1}
                                >
                                <Input placeholder="请输入显示顺序" type='number' defaultValue={1} />
                            </Form.Item>
                        </Col> 
                    </Row>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="是否外链"
                                name="isFrame"
                                rules={[{ required: false, message: '请选择是否外链' }]}
                                hidden={menuTypeId === 'F'}
                                >
                                <Radio.Group
                                    defaultValue={1}
                                    options={[
                                    { value: 0, label: '是' },
                                    { value: 1, label: '否' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="路由地址"
                                name="path"
                                rules={[{ required: menuTypeId !== 'F', message: '请输入路由地址' }]}
                                hidden={menuTypeId === 'F'}
                                >
                                <Input placeholder="请输入路由地址" />
                            </Form.Item>
                        </Col> 
                    </Row>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="组件路径"
                                name="component"
                                rules={[{ required: false, message: '请输入组件路径' }]}
                                hidden={menuTypeId !== 'C'}
                                >
                                <Input placeholder="请输入组件路径" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="路由参数"
                                name="query"
                                rules={[{ required: false, message: '请输入路由参数' }]}
                                hidden={menuTypeId !== 'C'}
                                >
                                <Input placeholder="请输入路由参数" type='number' />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="权限标识"
                                name="perms"
                                rules={[{ required: false, message: '请输入权限标识' }]}
                                hidden={menuTypeId === 'M'}
                                >
                                <Input placeholder="请输入权限标识" />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="是否缓存"
                                name="isCache"
                                rules={[{ required: false, message: '请输入是否缓存' }]}
                                hidden={menuTypeId !== 'C'}
                                initialValue={1}
                                >
                                <Radio.Group
                                    value={editMenuForm.getFieldValue("isCache")}
                                    options={[
                                    { value: 0, label: '缓存' },
                                    { value: 1, label: '不缓存' },
                                    ]}
                                />
                            </Form.Item>
                        </Col> 
                    </Row>
                    <Row
                        gutter={24}>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="显示状态"
                                name="visible"
                                rules={[{ required: false, message: '请选择显示状态' }]}
                                hidden={menuTypeId === 'F'}
                                initialValue={"0"}
                                >
                                <Radio.Group
                                    defaultValue={"0"}
                                    value={editMenuForm.getFieldValue("visible")}
                                    options={[
                                        { value: "0", label: '显示' },
                                        { value: "1", label: '隐藏' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<API.System.Menu>
                                label="菜单状态"
                                name="status"
                                rules={[{ required: true, message: '请选择菜单状态' }]}
                                hidden={menuTypeId === 'F'}
                                initialValue={"0"}
                                >
                                <Radio.Group
                                    value={"0"}
                                    defaultValue={"0"}
                                    options={[
                                        { value: "0", label: '正常' },
                                        { value: "1", label: '停用' },
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
                            editMenuForm.setFieldsValue({ icon: name });
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