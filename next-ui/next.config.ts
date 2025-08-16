import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 匹配前端发起的API请求路径
        destination: 'http://localhost:3001/api/:path*', // 将请求转发到后端服务器
      },
    ];
  },
};
export default withNextIntl(nextConfig);
