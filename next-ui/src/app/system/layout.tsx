
import { Breadcrumb } from "antd";
import { HighlightOutlined, TrademarkOutlined } from '@ant-design/icons';

const breadcrumbItems = [
    {
        title: <a href="/system/menu">系统管理</a>,
    },
    {
        title: '菜单管理',
    },
];

export default function SystemLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="pl-10 pr-10 pt-0 flex-1 flex flex-col h-full">
                <div className="mt-10">
                    <Breadcrumb items={breadcrumbItems}></Breadcrumb>
                </div>
                <div className="mt-5 text-2xl font-bold"><h1>{"菜单管理"}</h1></div>
                {children}
            </div>
            <div className="h-18 w-full flex flex-col justify-center items-center text-[14px] text-gray-600 p-5">
                <div><span className="mr-2 cursor-pointer hover:text-color-primary duration-600">Ruoyi Design Pro</span><HighlightOutlined className="!text-gray-950 mr-1"/><span className="hover:text-color-primary duration-600 cursor-pointer">Zhanj</span></div>
                <div className="mt-1"><TrademarkOutlined className="!text-gray-950 mr-1"/><span className="text-gray-950 font-normal hover:text-color-primary duration-600 cursor-pointer">2025 长沙黑镜科技有限公司出品</span></div>
            </div>
        </div>
    );
}