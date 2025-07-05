import '../../styles/globals.css';



import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import Topbar from '@/components/navigation/Topbar'; // ← include this
import { languages } from '@/i18n/settings';

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const lang = params.locale;
  const direction = dir(lang);

  return (
    <html lang={lang} dir={direction}>
      <body className="bg-background text-foreground">
        <Topbar />
        {children}
      </body>
    </html>
  );
}
