import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import '../globals.css'; // ✅ Because you're one level deep inside /app


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
