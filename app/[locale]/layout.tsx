import { dir } from 'i18next';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import UnifiedNavbar from '@/components/UnifiedNavbar';

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export async function generateStaticParams() {
  return ['en', 'fr', 'ht', 'es'].map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <UnifiedNavbar currentLocale={locale} />
        {children}
      </body>
    </html>
  );
}
