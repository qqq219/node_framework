import { request } from "../../common/utils/axiosrequest";
import { downloadFile } from "../../common/utils/downloadFile";

// 查询菜单权限列表
export async function getMenuList(params?: API.System.MenuListParams, options?: { [key: string]: any }) {
  return request<API.System.MenuPageResult>('/api/system/menu/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params,
    ...(options || {}),
  });
}

// 查询菜单权限详细
export function getMenu(menuId: number, options?: { [key: string]: any }) {
  return request<API.System.MenuInfoResult>(`/api/system/menu/${menuId}`, {
    method: 'GET',
    ...(options || {})
  });
}

// 新增菜单权限
export async function addMenu(params: API.System.Menu, options?: { [key: string]: any }) {
  return request<API.Result>('/api/system/menu/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params,
    ...(options || {})
  });
}

// 修改菜单权限
export async function updateMenu(params: API.System.Menu, options?: { [key: string]: any }) {
  return request<API.Result>('/api/system/menu', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params,
    ...(options || {})
  });
}

// 删除菜单权限
export async function removeMenu(ids: string, options?: { [key: string]: any }) {
  return request<API.Result>(`/api/system/menu/${ids}`, {
    method: 'DELETE',
    ...(options || {})
  });
}

// 导出菜单权限
export async function exportMenu(params?: API.System.MenuListParams, options?: { [key: string]: any }) { 
  const response = await request<API.Result>(`/api/system/menu/export`, {
    method: 'GET',
    responseType: 'blob',
    params
  });
  downloadFile(response, '菜单权限.xlsx');
}

// 查询菜单权限详细
export function getMenuTree() {
  return request('/api/system/menu/treeselect', {
    method: 'GET',
  });
}

// 查询菜单router列表
export function getRouterList() {
  return request('/api/system/menu/getRouters', {
    method: 'GET',
  });
}
