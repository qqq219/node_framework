'use client'
import { setInitialState } from "@/app/common/store/store";
import { fetchUserInfo } from "@/app/common/utils/access";
import FrameworkLayout from "@/components/FrameworkLayout";
import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BizPageLayout({ children }: React.PropsWithChildren) {
    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    const loading = useSelector((state:any) => state?.loading);
    const dispatch = useDispatch();
    const refreshUserInfo = async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
            dispatch(setInitialState(userInfo));
        }
    };

    useEffect(()=>{
        if(userInfo == null || userInfo.userId == undefined){
            refreshUserInfo();
        }
    },[]);
    return (
        <>
            <FrameworkLayout>
                {children}
                <Spin spinning={loading} fullscreen></Spin>
            </FrameworkLayout>
        </>
    );
}