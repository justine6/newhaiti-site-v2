
import '@/styles/globals.css';


import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import Topbar from '@/components/Topbar';

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export async function generateStaticParams() {
  return ['en', 'fr', 'ht', 'es'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale; // Already available in async layout

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
