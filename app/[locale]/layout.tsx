import '../../styles/globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import { languages } from '@/lib/i18n/settings';
import Topbar from '@/components/navigation/Topbar';

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  const direction = dir(locale); // get direction safely

  return (
    <html lang={locale} dir={direction}>
      <body>
        <Topbar locale={locale} />
        {children}
      </body>
    </html>
  );
}

// ✅ Place this OUTSIDE the component
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ht' },
    { locale: 'es' }, // add more if needed
  ];
}
