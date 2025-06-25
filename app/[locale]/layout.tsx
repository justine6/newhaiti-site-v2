import '@/styles/globals.css';
import { dir } from 'i18next';
import Navbar from '@/components/ui/Navbar';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout(props: Props) {
  const { children } = props;
  const { locale } = await Promise.resolve(props.params); // ✅ await the full params object

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <Navbar currentLocale={locale} />
        {children}
      </body>
    </html>
  );
}
