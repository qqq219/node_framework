

import { request } from "@/app/common/utils/axiosrequest";
import { downloadFile } from "@/app/common/utils/downloadFile";

// query 通知公告表 list
export async function getSysNoticeList(params?: API.System.SysNoticeListParams) {
  return request<API.System.SysNoticePageResult>('/api/system/sysNotice/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// query 通知公告表 detail
export function getSysNotice(noticeId: number) {
  return request<API.System.SysNoticeInfoResult>(`/api/system/sysNotice/${noticeId}`, {
    method: 'GET'
  });
}

// add 通知公告表
export async function addSysNotice(params: API.System.SysNotice) {
  return request<API.Result>('/api/system/sysNotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// edit 通知公告表
export async function updateSysNotice(params: API.System.SysNotice) {
  return request<API.Result>('/api/system/sysNotice', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// delete 通知公告表
export async function removeSysNotice(ids: string) {
  return request<API.Result>(`/api/system/sysNotice/${ids}`, {
    method: 'DELETE'
  });
}

// export 通知公告表
export async function exportSysNotice(params?: API.System.SysNoticeListParams) {
  const response = await request<API.Result>('/api/system/sysNotice/export', {
    method: 'GET',
    responseType: 'blob',
    params
  });
  downloadFile(response, 'SysNotice.xlsx');
}

    