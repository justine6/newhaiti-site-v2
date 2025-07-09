import '../../styles/globals.css';

import { ReactNode } from 'react';
import { dir } from 'i18next';
import type { Locale } from '@/lib/i18n/settings';

import { use } from 'react'; // ✅ Needed for unwrapping params
import Topbar from '@/components/navigation/Topbar';

export async function generateMetadata() {
  return {
    title: 'New Haiti Team 2075',
    description: 'Restoring Dignity. Rebuilding Hope.',
  };
}

export default function LocaleLayout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = use(Promise.resolve(props.params)); // ✅ Safe unwrap
  const direction = dir(locale as Locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <Topbar locale={locale} />
        {props.children}
      </body>
    </html>
  );
}
