// app/[locale]/layout.tsx
import '@/styles/globals.css';


import { dir } from 'i18next';
import { ReactNode } from 'react';
import { locales } from '@/i18n/settings';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await Promise.resolve(params);
  const direction = ['ar', 'he', 'fa'].includes(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body>
    </html>
  );
}


