'use client'
import { AntdRegistry } from "@ant-design/nextjs-registry"
import ConfigProvider from "antd/es/config-provider"
import { useSelector } from "react-redux"
import enCN from 'antd/es/locale/zh_CN';

export default function PageLayOutComponent({ children }: React.PropsWithChildren) {
    const themePrimaryColor = useSelector((state:any) => state.themePrimaryColor)

    return (
        <AntdRegistry>
          <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: themePrimaryColor,
                        
                    },
                }}
                locale={enCN}
            >
                {children}
            </ConfigProvider>
        </AntdRegistry>
      )
}