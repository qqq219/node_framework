'use client'

import clsx from 'clsx';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import FrameworkHeader from '@/components/FrameworkHeader';
import { useEffect, useState } from 'react'
import "@/asserts/home.css";  
import type { MenuProps } from 'antd';
import { Menu, message } from 'antd';
import {getRouterList} from '../app/services/menu'
import { buildTreeData } from '@/app/common/utils/tree';
import { MenuType } from '@/app/common/enum/menu';
import { createIcon } from '@/app/common/utils/IconUtil';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

export default function FrameworkLayout({ children }: React.PropsWithChildren) {
    const [navToggleStatus, setNavToggleStatus] = useState(false);
    const [routerItems, setRouterItems] = useState<MenuItem[]>([]);

    const formatRouterTreeData = (arrayList: any): MenuItem[]=> {
      const routerTreeData: MenuItem[] = arrayList.map((item: any) => {
        if(item.menuType === MenuType.F){
          return;
        }
        const node: MenuItem = {
          key: item.menuId,
          label: item.menuType == MenuType.C ? <Link href={item.component}>{item.menuName}</Link> : item.menuName,
          icon: createIcon(item.icon),
        } as MenuItem;
        if (node && 'children' in item && item.children && item.menuType === MenuType.M) {
          //@ts-ignore
          node.children = formatRouterTreeData(item.children);
        }
        return node;
      });
      return routerTreeData;
    }

    const toggerNavStatus = () => {
       setNavToggleStatus(!navToggleStatus);
    }
    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const fetchRouterData = async ()=>{
      let routerList:MenuItem[] = [];
      try{
        const routerListResp = await getRouterList();
        routerList = routerListResp.data.data as MenuItem[];

      }
      catch(error){
        const errorMsg = (error instanceof Error) ? error.message : String(error);
        console.log("errorMsg:" + errorMsg)
        message.error("获取路由列表失败");
      }
      const routerTree = formatRouterTreeData(buildTreeData(routerList, 'menuId', 'menuName', '', '', ''));
      setRouterItems(routerTree);
    }

    useEffect(() => {
      fetchRouterData();
    }, []);
    return (
        <div className="flex flex-col w-full h-screen overflow-hidden">
            <div className="w-full h-16">
              <FrameworkHeader></FrameworkHeader>
            </div>
            <div className="flex-1 flex w-full relative h-0">
              <div className={clsx("spliteLine","h-full z-50 relative duration-600 flex", {"!w-64": !navToggleStatus, "!w-20": navToggleStatus})}>
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
                    items={routerItems}/>
              </div>
              <div className="flex-1 w-full">
                {children}
              </div>
            </div>
          </div>
    );
}