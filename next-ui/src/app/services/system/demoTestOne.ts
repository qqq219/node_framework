

import { request } from "@/app/common/utils/axiosrequest";
import { downloadFile } from "@/app/common/utils/downloadFile";

// query 测试demo1 list
export async function getDemoTestOneList(params?: API.System.DemoTestOneListParams) {
  return request<API.System.DemoTestOnePageResult>('/api/system/demoTestOne/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// query 测试demo1 detail
export function getDemoTestOne(testId: number) {
  return request<API.System.DemoTestOneInfoResult>(`/api/system/demoTestOne/${testId}`, {
    method: 'GET'
  });
}

// add 测试demo1
export async function addDemoTestOne(params: API.System.DemoTestOne) {
  return request<API.Result>('/api/system/demoTestOne', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// edit 测试demo1
export async function updateDemoTestOne(params: API.System.DemoTestOne) {
  return request<API.Result>('/api/system/demoTestOne', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// delete 测试demo1
export async function removeDemoTestOne(ids: string) {
  return request<API.Result>(`/api/system/demoTestOne/${ids}`, {
    method: 'DELETE'
  });
}

// export 测试demo1
export async function exportDemoTestOne(params?: API.System.DemoTestOneListParams) {
  const response = await request<API.Result>('/api/system/demoTestOne/export', {
    method: 'GET',
    responseType: 'blob',
    params
  });
  downloadFile(response, 'DemoTestOne.xlsx');
}

    