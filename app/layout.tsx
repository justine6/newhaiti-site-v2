import { dir } from 'i18next';
import { languages } from '@/i18n/settings';

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const lang = params.locale; // already awaited by Next.js at this level
  const direction = dir(lang);

  return (
    <html lang={lang} dir={direction}>
      <body>{children}</body>
    </html>
  );
}
