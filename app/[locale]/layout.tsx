import { dir } from 'i18next';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
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
  const { locale } = await Promise.resolve(params); // ✅ Await params before using

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
