
import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';
import {ConfigProvider} from 'antd';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import '@ant-design/v5-patch-for-react-19';

const RootLayout = async function({ children }: React.PropsWithChildren) {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale}>
    <body className="text-1xl duration-1000">
      <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#5497FF',
              },
            }}
          >
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
  );
}

export default RootLayout;
