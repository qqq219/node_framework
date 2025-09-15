
import { request } from "../../common/utils/axiosrequest";
import { downLoadZip } from "../../common/utils/downloadFile";


// 查询分页列表
export async function getGenCodeList(params?: API.System.GenCodeTableListParams) {
  return request('/api/code/gen/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// 查询表信息
export async function getGenCode(id?: string) {
  return request(`/api/code/gen/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询数据表信息
export async function queryTableList(params?: any) {
  return request('/api/code/gen/db/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// 导入数据表信息
export async function importTables(tables?: string) {
  return request(`/api/code/gen/importTable?tables=${tables}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 删除
export async function removeData(params: { ids: string[] }) {
  return request(`/api/code/gen/${params.ids}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 添加数据
export async function addData(params: API.System.GenCodeType) {
  return request('/api/code/gen', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新数据
export async function updateData(params: API.System.GenCodeType) {
  return request('/api/code/gen', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

// 更新状态
export async function syncDbInfo(tableName: string) {
  return request(`/api/code/gen/synchDb/${tableName}`, {
    method: 'GET',
  });
}

// 生成代码（自定义路径）
export async function genCode(tableName: string) {
  return request(`/api/code/gen/genCode/${tableName}`, {
    method: 'GET',
  });
}

// 生成代码（压缩包）
export async function batchGenCode(tableName: string) {
  return downLoadZip(`/api/code/gen/batchGenCode?tables=${tableName}`);
}

// 预览
export async function previewCode(id: string) {
  return request(`/api/code/gen/preview/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
