import './globals.css';


import { dir } from 'i18next';
import { ReactNode } from 'react';

// Optional: safer helper to avoid hydration issues
const getDirection = (locale: string) => {
  const rtlLocales = ['ar', 'he', 'fa']; // Add more if needed
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;
  const direction = getDirection(locale); // Avoid dynamic behavior inconsistency

  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body>
    </html>
  );
}
