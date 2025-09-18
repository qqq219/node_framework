'use client'
import { setInitialState, saveThemePrimaryColor } from "@/app/common/store/store";
import { fetchUserInfo } from "@/app/common/utils/access";
import { getThemeColor, saveThemeColorToLocal } from "@/app/common/utils/localstorageUtils";
import FrameworkLayout from "@/components/FrameworkLayout";
import { CheckOutlined, SettingFilled, SettingOutlined } from "@ant-design/icons";
import { ColorPicker, Drawer, FloatButton, Spin } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BizPageLayout({ children }: React.PropsWithChildren) {
    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    const loading = useSelector((state:any) => state?.loading);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const modifyThemeColor = (color:string) => {
        saveThemeColorToLocal(color);
        dispatch(saveThemePrimaryColor(color));
        document.documentElement.style.setProperty('--color-color-primary', color);
        setThemePrimaryColor(color)
    }

    //初始化主题颜色

    const [themePrimaryColor, setThemePrimaryColor] = useState("")



    const showThemeSettingBar = (event:unknown) => {
        setOpen(true);
    }
    const onCloseThemeSettingBar = (event:unknown) => {
        setOpen(false);
    }
    const refreshUserInfo = async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
            dispatch(setInitialState(userInfo));
        }
    };

    useEffect(()=>{
        //初始化用户信息
        if(userInfo == null || userInfo.userId == undefined){
            refreshUserInfo();
        }
        const themePrimaryColorStorage = getThemeColor();
        if(themePrimaryColorStorage != null){
            modifyThemeColor(themePrimaryColorStorage)
        }

    },[]);

    const defaultColorItems = [
        "#5497FF",
        "#f40b0b",
        "#f4700b",
        "#f4e00b",
        "#49f40b",
        "#0bf4a3",
        "#a30bf4",
        "#ac2ea6",
    ]
    return (
        <>
            <FrameworkLayout>
                <Drawer
                    title="主题设置"
                    closable={{ 'aria-label': 'Close Button' }}
                    onClose={onCloseThemeSettingBar}
                    open={open}
                >
                    <div className="w-full h-full">
                        <div className="font-bold text-[1rem]">主题色</div>
                        <div className="flex flex-row items-start justify-start gap-4 mt-4">
                            {
                                defaultColorItems.map((color) => {return <div className={clsx("w-5 h-5 cursor-pointer justify-center flex items-center rounded-[5px]", `!bg-[${color}]`)} onClick={() => {modifyThemeColor(`${color}`)}}><CheckOutlined className={clsx("!text-white text-[0.6rem]", themePrimaryColor==`${color}`?"":"!hidden")}/></div>})
                            }
                            <ColorPicker defaultValue={themePrimaryColor} onChange={(color:any) => {modifyThemeColor(color.toCssString())}}>
                                { <SettingFilled className={clsx("text-[1.25rem] cursor-pointer !text-color-primary")}></SettingFilled>}
                            </ColorPicker>
                        </div>
                    </div>
                </Drawer>
                <FloatButton
                    shape="circle"
                    type="primary"
                    style={{ insetInlineEnd: 0, top:500}}
                    icon={<SettingOutlined />}
                    tooltip={<div>主题设置</div>}
                    onClick={showThemeSettingBar}
                    />
                {children}
                <Spin spinning={loading} fullscreen></Spin>
            </FrameworkLayout>
        </>
    );
}