'use client'
import FrameworkLayout from "@/components/FrameworkLayout";
import { Spin } from "antd";
import { useSelector } from "react-redux";

export default function BizPageLayout({ children }: React.PropsWithChildren) {
    const loading = useSelector((state:any) => state?.loading);
    return (
        <>
            <FrameworkLayout>
                {children}
                <Spin spinning={loading} fullscreen></Spin>
            </FrameworkLayout>
        </>
    );
}