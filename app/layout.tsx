

import '@/styles/globals.css';


import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import { ReactNode } from 'react';

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
      <body>{children}</body>
    </html>
  );
}
