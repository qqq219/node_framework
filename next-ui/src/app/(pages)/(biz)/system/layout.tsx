
import FrameworkLayout from '@/components/FrameworkLayout';
import { HighlightOutlined, TrademarkOutlined } from '@ant-design/icons';

export default function SystemLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="pl-8 pr-8 pt-0 flex-1 flex flex-col h-0 ">
                <div className="w-full flex-1 overflow-auto h-0">
                    {children}
                </div>
            </div>
            <div className="h-18 w-full flex flex-col justify-center items-center text-[14px] text-gray-600 p-5">
                <div><span className="mr-2 cursor-pointer hover:text-color-primary duration-600">Ruoyi Design Pro</span><HighlightOutlined className="!text-gray-950 mr-1"/><span className="hover:text-color-primary duration-600 cursor-pointer">Zhanj</span></div>
                <div className="mt-1"><TrademarkOutlined className="!text-gray-950 mr-1"/><span className="text-gray-950 font-normal hover:text-color-primary duration-600 cursor-pointer">2025 长沙黑镜科技有限公司出品</span></div>
            </div>
        </div>
    );
}