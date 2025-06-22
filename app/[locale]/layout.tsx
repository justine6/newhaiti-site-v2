import '../globals.css'; // ✅ This is correct based on your file structure

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import Topbar from '@/components/Topbar';

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} dir={dir(params.locale)}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
