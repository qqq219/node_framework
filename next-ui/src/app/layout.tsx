
import "./globals.css";
import { getLocale, getMessages } from 'next-intl/server';
import '@ant-design/v5-patch-for-react-19';
import { NextIntlClientProvider } from "next-intl";

const RootLayout = async function({ children }: React.PropsWithChildren) {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale}>
    <body className="text-1xl duration-1000">
        <NextIntlClientProvider messages={messages}>
            {children}
         </NextIntlClientProvider>
    </body>
  </html>
  );
}

export default RootLayout;
