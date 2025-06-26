import '../globals.css';
import { ReactNode } from 'react';
import Topbar from '@/components/navigation/Topbar';

// Optional helper to avoid hydration mismatch due to dir()
const getDirection = (locale: string): 'ltr' | 'rtl' => {
  const rtlLocales = ['ar', 'he', 'fa']; // Add more RTL languages if needed
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  const locale = params?.locale ?? 'en';
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
