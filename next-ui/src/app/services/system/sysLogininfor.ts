

import { request } from "@/app/common/utils/axiosrequest";
import { downloadFile } from "@/app/common/utils/downloadFile";

// query 系统访问记录 list
export async function getSysLogininforList(params?: API.System.SysLogininforListParams) {
  return request<API.System.SysLogininforPageResult>('/api/system/sysLogininfor/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// query 系统访问记录 detail
export function getSysLogininfor(infoId: number) {
  return request<API.System.SysLogininforInfoResult>(`/api/system/sysLogininfor/${infoId}`, {
    method: 'GET'
  });
}

// add 系统访问记录
export async function addSysLogininfor(params: API.System.SysLogininfor) {
  return request<API.Result>('/api/system/sysLogininfor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// edit 系统访问记录
export async function updateSysLogininfor(params: API.System.SysLogininfor) {
  return request<API.Result>('/api/system/sysLogininfor', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// delete 系统访问记录
export async function removeSysLogininfor(ids: string) {
  return request<API.Result>(`/api/system/sysLogininfor/${ids}`, {
    method: 'DELETE'
  });
}

// export 系统访问记录
export async function exportSysLogininfor(params?: API.System.SysLogininforListParams) {
  const response = await request<API.Result>('/api/system/sysLogininfor/export', {
    method: 'GET',
    responseType: 'blob',
    params
  });
  downloadFile(response, 'SysLogininfor.xlsx');
}

    