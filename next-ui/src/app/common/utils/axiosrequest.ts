//axios封装
//根域名配置
//超时
//请求拦截器/响应拦截器
import { message } from 'antd';
import axios from 'axios'


const request = axios.create({
    baseURL :  "/",
    timeout : 5000
})

// 在发送请求之前拦截 插入自定义配置 对于参数的处理
request.interceptors.request.use(config => {
    config.headers.setAuthorization("Bearer " + localStorage.getItem("access_token"));
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 对响应数据做拦截 处理返回数据
request.interceptors.response.use(response => {
    if (response.data?.success === false) {
      message.error('请求失败！');
    }
    return response;
  }, error => {
    // 对响应错误做些什么
    if(error.response.status === 401){
      message.error("用户未登录或登录已过期，请重新登录");
      setTimeout(() => {
        window.location.href = "/login?redirect=" + window.location.pathname;
      },1000)
    }

    return Promise.reject(error);
  });




export {request}