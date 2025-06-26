import { dir } from 'i18next';
import { ReactNode } from 'react';

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale ?? 'en';

  return (
    <div lang={locale} dir={dir(locale)}>
      {children}
    </div>
  );
}
