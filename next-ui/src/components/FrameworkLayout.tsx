'use client'

import clsx from 'clsx';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import FrameworkHeader from '@/components/FrameworkHeader';
import Link from 'next/link';
import { useState } from 'react'
import "@/asserts/home.css";  
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label:  (
            <Link href={"/system/menu"}>菜单管理</Link>
          ),  },
          { key: '2', label: (
            <Link href={"/"}>菜单管理</Link>
          ) },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9', icon: <MailOutlined /> },
      { key: '10', label: 'Option 10', icon: <MailOutlined />  },
      { key: '11', label: 'Option 11', icon: <MailOutlined />  },
      { key: '12', label: 'Option 12', icon: <MailOutlined />  },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];


export default function FrameworkLayout({ children }: React.PropsWithChildren) {
    const [navToggleStatus, setNavToggleStatus] = useState(false);
    const toggerNavStatus = () => {
       setNavToggleStatus(!navToggleStatus);
    }
    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    return (
        <div className="flex flex-col w-full h-screen">
            <div className="w-full h-16">
              <FrameworkHeader></FrameworkHeader>
            </div>
            <div className="flex-1 flex w-full relative">
              <div className={clsx("spliteLine","h-full z-50 relative duration-600 flex", {"w-64": !navToggleStatus, "w-20": navToggleStatus})}>
                  {/*菜单栏伸缩按钮*/}
                  <div onClick={()=>toggerNavStatus()} className={clsx("nav-toggle-btn", "w-6 h-6 text-[12px] absolute rounded-full float-end -right-3 mt-10 items-center justify-center flex cursor-pointer z-50 text-gray-400 hover:text-color-primary duration-300")}>
                    <div className={clsx({"hidden" : navToggleStatus == false})}>
                      <RightOutlined/>
                    </div>
                    <div className={clsx({"hidden" : navToggleStatus == true})}>
                      <LeftOutlined />
                    </div>
                  </div>
                  <Menu
                    onClick={onMenuClick}
                    style={{ borderRight: 0, width: '100%' }}
                    className='h-full w-full'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={navToggleStatus}
                    items={items}/>
              </div>
              <div className="flex-1 h-full">
                {children}
              </div>
            </div>
          </div>
    );
}