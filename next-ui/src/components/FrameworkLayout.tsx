'use client'

import clsx from 'clsx';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import FrameworkHeader from '@/components/FrameworkHeader';
import { useEffect, useState } from 'react'
import "@/asserts/home.css";  
import type { MenuProps } from 'antd';
import { Breadcrumb, Menu, message } from 'antd';
import {getRouterList} from '../app/services/system/menu'
import { buildTreeData } from '@/app/common/utils/tree';
import { MenuType } from '@/app/common/enum/menu';
import { createIcon } from '@/app/common/utils/IconUtil';
import Link from 'next/link';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Url } from 'next/dist/shared/lib/router/router';


import { usePathname } from 'next/navigation'

type MenuItem = Required<MenuProps>['items'][number];

export default function FrameworkLayout({ children }: React.PropsWithChildren) {
    const [navToggleStatus, setNavToggleStatus] = useState(false);
    const [routerItems, setRouterItems] = useState<MenuItem[]>([]);
    const [routerList, setRouterList] = useState<API.System.Menu[]>([]);
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItemType[]>([]);
    const [selectedMenuKey, setSelectedMenuKey] = useState<string>("");
    const [keyPath, setKeyPath] = useState<string[]>()
    const pathName = usePathname();

    const formatRouterTreeData = (arrayList: any): MenuItem[]=> {
      const routerTreeData: MenuItem[] = arrayList.map((item: any) => {
        if(item.menuType === MenuType.F){
          return;
        }
        let label = null;
        if(item.menuType == MenuType.C ) 
        {
          label = <Link target={item.isFrame == 0? "_blank":"_self"} href={item.component}>{item.menuName}</Link>
        }
        else{
          label = item.menuName;
        }
        const node: MenuItem = {
          key: item.menuId,
          label: label,
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

    const updateBreadcrumbItems = (keyPath:string[] | undefined) => {
        if(keyPath == undefined){
          return;
        }
        const routerItem = routerList.find(routerItem=>routerItem.menuId == Number(keyPath[0]));
        if(routerItem == undefined || routerItem.menuType != MenuType.C){
          return;
        }
        const routerPaths = keyPath.reverse().map((key) => {
          return getBreadcrumbItem(Number(key));
        });
        setBreadcrumbItems(routerPaths)
    }

    const onMenuClick: MenuProps['onClick'] = (item) => {
      updateBreadcrumbItems(item.keyPath)
    };

    const getBreadcrumbItem = (key:number) => {
        const routerItem = routerList.find(routerItem=>routerItem.menuId == key);
        if(routerItem?.component){
          return {
            title: <Link href={routerItem?.component as Url} className='!text-black'>{routerItem?.menuName}</Link>,
            key:`${routerItem.menuId}`
          };
        }
        else{
          return {
            title: <span className='!text-black'>{routerItem?.menuName}</span>,
            key:`${routerItem?.menuId}`
          };
        }
    }

    const findSelectedMenuKey = ():string => {
      const routerItem = routerList.find(routerItem=>{
        return routerItem.component == pathName;
      });
      return `${routerItem?.menuId}`
    }

    const fetchRouterData = async ()=>{
      let routerList:[] = [];
      try{
        const routerListResp = await getRouterList();
        routerList = routerListResp.data.data;
        setRouterList(routerList);
      }
      catch(error){
        const errorMsg = (error instanceof Error) ? error.message : String(error);
        console.log("errorMsg:" + errorMsg)
        message.error("获取路由列表失败");
      }
      const routerTree = formatRouterTreeData(buildTreeData(routerList, 'menuId', 'menuName', '', '', ''));
      setRouterItems(routerTree);
    }

    const getRouterItemByMenuId = (menuId:number) => {
      return routerList.find(routerItem=>{
          return routerItem.menuId == menuId;
      });
    }

    const onOpenChange = (newOpenKeys:any) => {
      setKeyPath(newOpenKeys);
    }

    const onMenuSelect = (newSelectKeys:any) => {
      setSelectedMenuKey(newSelectKeys.key)
    }

    useEffect(() => {
      fetchRouterData();
    }, []);

    useEffect(()=>{
      const menuKey = findSelectedMenuKey();
      const keyPathBuf = [menuKey];
      let routerItem = getRouterItemByMenuId(Number(menuKey));
      while(routerItem?.parentId){
        keyPathBuf.push(String(routerItem.parentId))
        routerItem = getRouterItemByMenuId(Number(routerItem.parentId));
      }
      setKeyPath(keyPathBuf)
      setSelectedMenuKey((menuKey))
    },[routerList])

    useEffect(()=>{
      updateBreadcrumbItems(keyPath)
    },[keyPath])
    return (
        <div className="flex flex-col w-full h-screen overflow-hidden">
            <div className="w-full h-16">
              <FrameworkHeader>
              </FrameworkHeader>
            </div>
            <div className="flex-1 flex w-full relative h-0">
              <div className={clsx("spliteLine","h-full z-50 relative duration-600 flex", {"!w-48": !navToggleStatus, "!w-20": navToggleStatus})}>
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
                    selectedKeys={[selectedMenuKey]}
                    openKeys={keyPath}
                    onOpenChange={onOpenChange}
                    onSelect={onMenuSelect}
                    mode="inline"
                    inlineCollapsed={navToggleStatus}
                    items={routerItems}/>
                  
              </div>
              <div className="flex flex-col flex-1 w-0">
                <div className="mt-10 pl-8">
                    <Breadcrumb items={breadcrumbItems}></Breadcrumb>
                </div>
                <div className='flex-1 h-0 overflow-auto'>
                  {children}
                </div>
              </div>
            </div>
          </div>
    );
}