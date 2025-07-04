import '../globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Topbar from '@/components/navigation/Topbar';
import { dir } from 'i18next';

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
  const lang = params.locale;
  const direction = dir(lang); // Optional: await something here if needed

  return (
    <html lang={lang} dir={direction}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
