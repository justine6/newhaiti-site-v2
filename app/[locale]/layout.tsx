import '../../styles/globals.css';

import { ReactNode } from 'react';
import { dir } from 'i18next';
import { languages, type Locale } from '@/lib/i18n/settings';
import Topbar from '@/components/navigation/Topbar';

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

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
  const locale = params.locale;

  // Validate locale and fallback to 'en'
  const safeLocale: Locale = languages.includes(locale as Locale)
    ? (locale as Locale)
    : 'en';

  const direction = dir(safeLocale); // e.g., 'ltr'

  return (
    <html lang={safeLocale} dir={direction}>
      <body>
        <Topbar locale={safeLocale} />
        {children}
      </body>
    </html>
  );
} // ✅ <--- This closing brace was missing
