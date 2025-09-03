import { request } from "../common/utils/axiosrequest";

// 查询字典类型列表
export async function uploadFile(params?: any) {
  return request(`/api/system/file/upload`, {
    params: {
      ...params,
    },
    method: 'POST',
  });
}
