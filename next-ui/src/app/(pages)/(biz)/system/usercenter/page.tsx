'use client';
import { setInitialState, setLoading } from "@/app/common/store/store";
import { fetchUserInfo } from "@/app/common/utils/access";
import { getDictSelectOption } from "@/app/services/dict";
import { updateUserProfile, updateUserPwd } from "@/app/services/user";
import { InsertRowAboveOutlined, MailOutlined, PhoneOutlined, SaveOutlined, SearchOutlined, UsergroupDeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card,Form,Image, Input, message, Radio, Tabs  } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserCenterPage() {
    const [userInfoForm] = Form.useForm();
    const [sexOptions, setSexOptions] = useState<any>([]);
    const [modifyPwdForm] = Form.useForm();
    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    const dispatch = useDispatch();
    const refreshUserInfo = async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
            dispatch(setInitialState(userInfo));
        }
    };
    const handleFinish = async (values: Record<string, any>) => {
        const data = { ...values } as API.CurrentUser;
        const resp = await updateUserProfile(data);
        if (resp.data.code === 200) {
            message.success('保存成功');
            refreshUserInfo();
        } else {
            message.warning(resp.data.msg);
        }
    };
    const handlePasswordFinish = async (values: Record<string, any>) => {
        const resp = await updateUserPwd(values.oldPassword, values.newPassword);
        if (resp.data.code === 200) {
            message.success('保存成功');
        } else {
            message.warning(resp.data.msg);
        }
    };

    const checkPassword = (rule: any, value: string) => {
        const login_password = modifyPwdForm.getFieldValue('newPassword');
        if (value === login_password) {
        return Promise.resolve();
        }
        return Promise.reject(new Error('两次密码输入不一致'));
    };

    useEffect( () => {
        dispatch(setLoading(true));
        getDictSelectOption('sys_user_sex').then((data) => {
            setSexOptions(data);
            dispatch(setLoading(false));
        });
        userInfoForm.setFieldsValue(userInfo);
    }, []);
    return (
        <div className='w-full h-full flex flex-row gap-4 pt-5'>
            {/*条件筛选栏 */}
            <Card 
                className="w-[25%] h-fit" 
                title="个人资料">
                <div className="w-ful flex flex-col items-center justify-center" style={{borderBottom:"var(--border-primary)"}}>
                    <div>
                        <Image
                            width={100}
                            src={userInfo.avatar}
                            className=""
                            style={{borderRadius:"50%", border:"var(--border-primary)"}}
                            />
                    </div>
                     <Button color="primary" variant="text">
                        修改头像
                    </Button>
                </div>    
                <div className="w-ful flex flex-row h-10 items-center" style={{borderBottom:"var(--border-primary)"}}>
                    <span className="flex-1"><UserOutlined /> 登录名称:</span>  
                    <span>{userInfo.userName}</span>
                </div>  
                <div className="w-ful flex flex-row h-10 items-center" style={{borderBottom:"var(--border-primary)"}}>
                    <span className="flex-1"><PhoneOutlined /> 手机号码:</span>  
                    <span>{userInfo.phonenumber}</span>
                </div>  
                <div className="w-ful flex flex-row h-10 items-center" style={{borderBottom:"var(--border-primary)"}}>
                    <span className="flex-1"><UsergroupDeleteOutlined /> 所属部门:</span>  
                    <span>{userInfo.dept?.deptName}</span>
                </div>  
                <div className="w-ful flex flex-row h-10 items-center" style={{borderBottom:"var(--border-primary)"}}>
                    <span className="flex-1"><UsergroupDeleteOutlined /> 职位:</span>  
                    <span>{(userInfo.posts?.map((post:any)=>{return post.postName}))?.join("/")}</span>
                </div>  
                <div className="w-ful flex flex-row h-10 items-center" style={{borderBottom:"var(--border-primary)"}}>
                    <span className="flex-1"><MailOutlined /> 邮箱地址:</span>  
                    <span>{userInfo.email}</span>
                </div>  
                <div className="w-ful flex flex-row h-10 items-center" style={{borderBottom:"var(--border-primary)"}}>
                    <span className="flex-1"><InsertRowAboveOutlined /> 创建时间:</span>  
                    <span>{dayjs(userInfo.createTime).format('YYYY年MM月DD日')}</span>
                </div>  
            </Card>
            <Card className="flex-1 h-fit" title="基本资料">
                <Tabs
                    type="card"
                    items={[
                        {
                            label: "基本资料",
                            key: "1",
                            children: 
                            <div className="w-full pl-30">
                                <Form
                                    form={userInfoForm}
                                    labelCol={{ span: 2 }}
                                    onFinish={handleFinish}
                                    >
                                    <Form.Item<API.System.User>
                                        label="用户昵称"
                                        labelAlign="left"
                                        name="nickName"
                                        rules={[
                                        {
                                            required: true,
                                            message: (
                                                "请输入用户昵称！" 
                                            ),
                                        },
                                        ]}>
                                        <Input placeholder="请输入用户昵称" />
                                    </Form.Item>
                                    <Form.Item<API.System.User>
                                        label="手机号码"
                                        labelAlign="left"
                                        name="phonenumber"
                                        rules={[
                                        {
                                            required: false,
                                            message: (
                                            "请输入手机号码！"
                                            ),
                                        },
                                        ]}>
                                        <Input placeholder="请输入手机号码" />
                                    </Form.Item>
                                    <Form.Item<API.System.User>
                                        label="邮箱"
                                        labelAlign="left"
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: "无效的邮箱地址",
                                            },
                                            {
                                                required: false,
                                                message: "请输入邮箱！"
                                            },
                                        ]}>
                                        <Input placeholder="请输入用户昵称" />
                                    </Form.Item>
                                    <Form.Item<API.System.User>
                                        label="性别"
                                        labelAlign="left"
                                        name="sex"
                                        initialValue={"0"}>
                                        <Radio.Group
                                            options={sexOptions}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={false}
                                        colon={false}
                                        >
                                            <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                                                保存
                                            </Button>
                                    </Form.Item>
                                </Form>
                            </div>,
                        },
                        {
                            label: "修改密码",
                            key: "2",
                            children: 
                             <div className="w-full pl-30">
                                <Form
                                    form={modifyPwdForm}
                                    labelCol={{ span: 2 }}
                                    onFinish={handlePasswordFinish}
                                    >
                                    <Form.Item
                                        label="旧密码"
                                        labelAlign="left"
                                        name="oldPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入旧密码！",
                                            },
                                        ]}>
                                        <Input placeholder="请输入旧密码" type="password" />
                                    </Form.Item>
                                    <Form.Item
                                        label="新密码"
                                        labelAlign="left"
                                        name="newPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入新密码！",
                                            },
                                        ]}>
                                        <Input placeholder="请输入新密码" type="password"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="确认密码"
                                        labelAlign="left"
                                        name="confirmPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入确认密码！",
                                            },
                                            { validator: checkPassword },
                                        ]}>
                                        <Input placeholder="请输入确认密码" type="password" />
                                    </Form.Item>
                                    <Form.Item
                                        label={false}
                                        colon={false}
                                        >
                                            <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                                                保存
                                            </Button>
                                    </Form.Item>
                                </Form>
                            </div>,
                        }
                    ]}
                />  
            </Card>
    </div>
    );
}