import '../globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import type { ReactNode } from 'react'; // ✅ Keep this as `type` import
import Topbar from '@/components/navigation/Topbar';

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
