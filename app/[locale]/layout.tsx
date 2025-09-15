import "../../styles/globals.css";
import { ReactNode } from "react";
import Topbar from "@/components/navigation/Topbar";
import { locales, type Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  // ✅ Next.js 15 requires awaiting params
  const { locale: rawLocale } = await Promise.resolve(params);

  const safeLocale: Locale =
    rawLocale && locales.includes(rawLocale as Locale)
      ? (rawLocale as Locale)
      : "en"; // fallback to English

  const homeDict = (await getDictionary(safeLocale, "home")) as any;

  const topbarLabels =
    homeDict?.topbar ?? {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      vision: "Vision",
      videos: "Videos",
      language: "Language"
    };

  return (
    <html lang={safeLocale} suppressHydrationWarning>
      <body>
        <Topbar locale={safeLocale} labels={topbarLabels} />
        {children}
      </body>
    </html>
  );
}
