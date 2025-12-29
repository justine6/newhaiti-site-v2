// app/[locale]/layout.tsx
import "@/styles/globals.css";
import type { ReactNode } from "react";

import Topbar from "@/components/navigation/Topbar";
import Footer from "@/components/Footer";
import TranslationWarning from "@/lib/hooks/TranslationWarning";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale } from "@/lib/i18n/settings";
import { ThemeProvider } from "@/components/theme-provider"; // 👈 named import

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // 👈 params is a Promise in Next 15
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  // ✅ Load the footer dictionary (lib/i18n/dictionaries/{locale}/footer.json)
  const footerDictionary = await getDictionary(locale, "footer");

  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <Topbar locale={locale} />
          <TranslationWarning locale={locale} />
          <main>{children}</main>

          {/* Footer with translations + attribution */}
          <Footer locale={locale} dictionary={footerDictionary} />
        </ThemeProvider>
      </body>
    </html>
  );
}
