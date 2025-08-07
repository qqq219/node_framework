
declare namespace API.System {

  interface Menu {
    key: React.ReactNode;
    menuId: string;
    menuName: string;
    orderNum: number;
    path: string;
    status: string;
    icon: string;
    children?: DataType[];
  }

  export interface MenuListParams {
    menuId?: string;
    menuName?: string;
    parentId?: string;
    orderNum?: string;
    path?: string;
    component?: string;
    query?: string;
    isFrame?: number;
    isCache?: string;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    currentPage?: string;
    filter?: string;
    sorter?: string;
  }

  export interface MenuInfoResult {
    current: number;
    pageSize: number;
    total: number;
    data: Menu;
  }

   export interface MenuPageResult {
    current: number;
    pageSize: number;
    total: number;
    data: Array<Menu>;
  }

}
