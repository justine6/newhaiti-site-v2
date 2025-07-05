import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import '@/styles/globals.css';




export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const lang = params.locale;
  const direction = dir(lang);

  return (
    <html lang={lang} dir={direction}>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
