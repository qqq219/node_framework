

import { request } from "@/app/common/utils/axiosrequest";
import { downloadFile } from "@/app/common/utils/downloadFile";

// query 操作日志记录 list
export async function getSysOperLogList(params?: API.System.SysOperLogListParams) {
  return request<API.System.SysOperLogPageResult>('/api/system/sysOperLog/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// query 操作日志记录 detail
export function getSysOperLog(operId: number) {
  return request<API.System.SysOperLogInfoResult>(`/api/system/sysOperLog/${operId}`, {
    method: 'GET'
  });
}

// add 操作日志记录
export async function addSysOperLog(params: API.System.SysOperLog) {
  return request<API.Result>('/api/system/sysOperLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// edit 操作日志记录
export async function updateSysOperLog(params: API.System.SysOperLog) {
  return request<API.Result>('/api/system/sysOperLog', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// delete 操作日志记录
export async function removeSysOperLog(ids: string) {
  return request<API.Result>(`/api/system/sysOperLog/${ids}`, {
    method: 'DELETE'
  });
}

// export 操作日志记录
export async function exportSysOperLog(params?: API.System.SysOperLogListParams) {
  const response = await request<API.Result>('/api/system/sysOperLog/export', {
    method: 'GET',
    responseType: 'blob',
    params
  });
  downloadFile(response, 'SysOperLog.xlsx');
}

    