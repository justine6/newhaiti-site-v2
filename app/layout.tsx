import './globals.css';
import { ReactNode } from 'react';

const getDirection = (locale: string) => {
  const rtlLocales = ['ar', 'he', 'fa'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body> {/* ✅ No Topbar here */}
    </html>
  );
}
