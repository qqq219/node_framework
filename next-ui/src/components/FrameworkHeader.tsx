
import Image from 'next/image';
import { CodeSandboxOutlined, FontColorsOutlined, SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Dropdown, MenuProps, message } from 'antd';
import { clearSessionToken } from '@/app/common/utils/access';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/auth';
import { setInitialState, setLoading } from '@/app/common/store/store';
import { useDispatch } from 'react-redux';

export default function FrameworkHeader() {
    const router = useRouter();
    const dispatch = useDispatch();
    const loginOut = async () => {
        dispatch(setLoading(true))
        await logout();
        message.success("退出登录成功");
        clearSessionToken();
        dispatch(setLoading(false))
        dispatch(setInitialState({}));
        const { search, pathname } = window.location;
        router.replace("/login?redirect=" + pathname + search);
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
            <Link rel="个人中心" href="/system/usercenter">
                个人中心
            </Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <div onClick={loginOut}>退出登录</div>,
        },
    ];
    return (
        <div className="w-full h-full flex text-gray-600" style={{ borderBottom: 'var(--spacing-inline-end-primary)' }}>
            {/* Logo and Title */}
            <Link href={"/"} className='flex flex-row items-center w-64 justify-center'>
                <span className='text-3xl font-bold text-color-primary'><CodeSandboxOutlined /></span>
                <span className='ml-2 text-[0.9rem] font-bold'>Ruoyi Design Pro</span>
            </Link>
            {/*user center logo */}
            <div className='flex-1 flex flex-row items-center justify-end'>
                <div className='w-fit flex flex-row items-center mr-30 cursor-pointer hover:text-color-primary duration-300'>
                    <Dropdown menu={{ items }} className='!w-25'>  
                    <div className='flex flex-row items-center'>   
                    <Image
                        src="/image/userIcon.png"
                        alt="User Avatar"
                        width={25}
                        height={25}
                        className="rounded-full cursor-pointer hover:opacity-80 duration-300"
                    />
                    <span className='text-sm ml-2'>若依</span>
                    </div>        
                     </Dropdown>
                </div>
                <div className='flex flex-col items-center cursor-pointer hover:text-color-primary duration-300 text-[1.2rem] mr-5'>
                    <FontColorsOutlined />
                </div>
                
            </div>
        </div>
    );
}   