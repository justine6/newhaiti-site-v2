import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/settings";
import Topbar from "@/components/navigation/Topbar";

type LocaleLayoutProps = {
  children: ReactNode;
  // Next 15 may pass params as a Promise, so allow both
  params: { locale: Locale } | Promise<{ locale: Locale }>;
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  // ✅ Handle both “plain object” and “Promise” cases
  const resolvedParams = await props.params;
  const locale = resolvedParams?.locale ?? "en";

  return (
    <html lang={locale}>
      <body>
        <Topbar
          locale={locale}
          labels={{
            home: "Home",
            about: "About",
            projects: "Projects",
            blog: "Blog",
            contact: "Contact",
            vision: "Vision",
            language: "Language",
          }}
        />
        {props.children}
      </body>
    </html>
  );
}
