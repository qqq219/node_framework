'use client'
import { AntdRegistry } from "@ant-design/nextjs-registry"
import ConfigProvider from "antd/es/config-provider"
import { useDispatch, useSelector } from "react-redux"
import enCN from 'antd/es/locale/zh_CN';
import { getThemeColor, saveThemeColorToLocal } from "@/app/common/utils/localstorageUtils";
import { saveThemePrimaryColor } from "@/app/common/store/store";
import { useEffect, useState } from "react";

export default function PageLayOutComponent({ children }: React.PropsWithChildren) {
    const themePrimaryColor = useSelector((state:any) => state?.themePrimaryColor);
    const dispatch = useDispatch();
    const modifyThemeColor = (color:string) => {
        saveThemeColorToLocal(color);
        dispatch(saveThemePrimaryColor(color));
        document.documentElement.style.setProperty('--color-color-primary', color);
    }
    useEffect(()=>{
        //初始化主题颜色
        const themeColorLocalStorage = getThemeColor()
        if(themeColorLocalStorage){
            modifyThemeColor(themeColorLocalStorage);
        }
    }, []);

    
   
    return (
        <AntdRegistry>
          <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: themePrimaryColor as unknown as string,
                    },
                }}
                locale={enCN}
            >
                {children}
            </ConfigProvider>
        </AntdRegistry>
      )
}