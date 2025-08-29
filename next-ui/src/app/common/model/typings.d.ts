/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface Result {
    code: number;
    msg: string;
    data?: Record<string, any>;
  }

  type CurrentUser = UserInfo & {
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };
  
  export type DictTypeListParams = {
    dictId?: string;
    dictName?: string;
    dictType?: string;
    status?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    currentPage?: string;
    filter?: string;
    sorter?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    uuid?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    code: number;
    msg?: string;
    type?: string;
    data?: {
      access_token?: string;
      expires_in?: number;
    }
  };

  type UserInfoResult = {
    code?: number;
    msg?: string;
    user: UserInfo;
    permissions: any;
    roles: any;
  };

  type RoutersMenuItem = {
    alwaysShow?: boolean;
    children?: RoutersMenuItem[];
    component?: string;
    hidden?: boolean;
    meta: MenuItemMeta;
    name: string;
    path: string;
    redirect?: string;
    [key: string]: any;
  };
}
