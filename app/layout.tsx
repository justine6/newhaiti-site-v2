import Navbar from '@/components/ui/Navbar';

import './globals.css';

import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import { ReactNode } from 'react';

export function generateStaticParams() {
  return languages.map(lng => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = await Promise.resolve(params.locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      ...
    </html>
  );
}
