import '../../styles/globals.css';

import { ReactNode } from 'react';
import { dir } from 'i18next';
import type { Locale } from '@/lib/i18n/settings';

import Topbar from '@/components/navigation/Topbar'; // ✅ Make sure this path is correct

export async function generateMetadata() {
  return {
    title: 'New Haiti Team 2075',
    description: 'Restoring Dignity. Rebuilding Hope.',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const direction = dir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <Topbar locale={locale} /> {/* ✅ Topbar now shows on all pages */}
        {children}
      </body>
    </html>
  );
}
