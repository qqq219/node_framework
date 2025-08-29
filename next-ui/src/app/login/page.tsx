'use client'
import { LockOutlined, SafetyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { Image } from "antd";
import { getCaptchaImg, login } from "../services/auth";
import { clearSessionToken, fetchUserInfo, setSessionToken } from "../common/utils/access";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch, Provider } from 'react-redux';
import { setInitialState } from "../common/store/userinfostore";
import { userinfoStore } from "../common/store/userinfostore";


export default function LoginPage({ children }: React.PropsWithChildren){
    const [loginForm] = useForm()
    const [loginFormWidth, setLoginFormWidth] = useState<number>(0);
    const [captchaCode, setCaptchaCode] = useState<string>('');
    const [uuid, setUuid] = useState<string>('');
    const router = useRouter()
    // const initialState = useSelector((state:any) => state.userInfo.value);
    
    const handleResize = () => {
        const containerWidth = window.innerWidth < 1280?1280:window.innerWidth
        const widthCalcuByHeight = window.innerHeight * 16 / 9;
        if(widthCalcuByHeight > containerWidth){
            setLoginFormWidth(widthCalcuByHeight * 0.67)
        }
        else{
            setLoginFormWidth(containerWidth* 0.67)
        }
    };

    const getCaptchaCode = async () => {
        const captchaImagResp = await getCaptchaImg();
        if(captchaImagResp.data.code !== 200){
            throw new Error("获取验证码失败");
        }
        const imgdata = `data:image/svg+xml;base64,${captchaImagResp.data.data.img}`;
        setCaptchaCode(imgdata);
        setUuid(captchaImagResp.data.data.uuid);
    };

    const refreshUserInfo = async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
            setInitialState(userInfo);
        }
    };

    const handleSubmit = async (values: API.LoginParams) => {
        try {
            // 登录
            const response = await login({ ...values, uuid });
            if (response.data.code === 200) {
                const defaultLoginSuccessMessage = "登录成功!";
                const current = new Date();
                const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60);
                setSessionToken(response.data.data?.access_token, response.data.data?.access_token, expireTime);
                message.success(defaultLoginSuccessMessage);
                await refreshUserInfo();
                console.log('login ok');
                const urlParams = new URL(window.location.href).searchParams;
                router.push(urlParams.get('redirect') || '/dashboard');
                return;
            } else {
                console.log(response.data.msg);
                clearSessionToken();
                getCaptchaCode();
            }
        } catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            console.log(error);
            message.error(defaultLoginFailureMessage);
            router.push("/login")
        }
    };

    const onFinish: FormProps<API.LoginParams>['onFinish'] = async (values) => {
        console.log('Success:', values);
        await handleSubmit(values as API.LoginParams);
    };

    const onFinishFailed: FormProps<API.LoginParams>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        getCaptchaCode();
        // 组件卸载时移除事件监听器，防止内存泄漏   
        return () => window.removeEventListener('resize', handleResize);
    }, []); // 空数组确保这个effect只在mount和unmount时运行

    return(
    <Provider store={userinfoStore}>
    <div>
        <div className="w-screen h-screen min-w-[1280px] bg-[url(/image/loginBg.jpg)] bg-no-repeat bg-cover overflow-hidden"
            >
            <div className={clsx("aspect-video flex flex-col items-end justify-center overflow-hidden")} style={{width:`${loginFormWidth}px`, marginLeft:`${loginFormWidth==undefined?0:loginFormWidth/4}px`,marginTop:`${loginFormWidth==undefined?0:loginFormWidth/7}px`, paddingRight:`${loginFormWidth==undefined?0:loginFormWidth/15}px`}}>
                <Form<API.LoginParams>
                    form={loginForm}
                    className="!w-[45%]"
                    autoComplete="off"
                    labelCol={{span: 5}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    size="large"
                >
                    <Form.Item
                        className="text-center"
                        label={true}
                        colon={false}
                    >
                        <span className="justify-center text-center w-full text-2xl font-bold text-color-primary">欢迎登录ZHANJ-RUOYI管理后台</span>
                    </Form.Item>
                    <Form.Item<API.LoginParams>
                        className="!mt-5"
                        label={<span className="text-[1rem] h-10 items-center justify-center text-center flex">用户名</span>}
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input className="!h-10 w-full" placeholder="请输入用户名" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item<API.LoginParams>
                        className="!mt-5"
                        label={<span className="text-[1rem] h-10 items-center justify-center text-center flex">密码</span>}
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input className="!h-10 w-full" placeholder="请输入密码" prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item<API.LoginParams>
                        className="!mt-5"
                        label={<span className="text-[1rem] h-10 items-center justify-center text-center flex">验证码</span>}
                        name="code"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                    >
                        <div className="w-full !h-10 flex flex-row gap-5">
                            <Input className="!h-10 !flex-1" placeholder="请输入验证码" prefix={<SafetyOutlined />} />
                            <Image className="!h-10 !w-35 cursor-pointer" onClick={()=>{getCaptchaCode()}} preview={false} src={captchaCode?captchaCode:"/image/loginBg.jpg"}></Image>
                        </div>
                    </Form.Item>
                    <Form.Item<API.LoginParams>
                        className="!mt-5"
                        label={true}
                        colon={false}
                        >
                            <Button className="!h-10 w-full" type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
    </Provider>
    ) 
    
}