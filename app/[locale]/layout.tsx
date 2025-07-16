import '../../styles/globals.css';

import { ReactNode } from 'react';
import { dir } from 'i18next';
import { use } from 'react'; // ✅ Needed for use(Promise.resolve(...))
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

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = use(Promise.resolve(params)); // ✅ This is what Next.js 15 expects
  const direction = dir(locale as Locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <Topbar locale={locale} />
        {children}
      </body>
    </html>
  );
}
