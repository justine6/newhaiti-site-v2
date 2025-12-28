// app/[locale]/team-docs/page.tsx
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale, type Locale } from "@/lib/i18n/settings";
import type { TeamDocsDictionary } from "@/lib/i18n/types";

type TeamDocsRouteParams = {
  locale?: string;
};

type TeamDocsPageProps = {
  // Next 15: params is a Promise-like
  params: Promise<TeamDocsRouteParams>;
};

// Static list of locales for SSG
const STATIC_LOCALES: Locale[] = ["en", "fr", "ht", "es"];

export async function generateStaticParams() {
  return STATIC_LOCALES.map((locale) => ({ locale }));
}

export default async function TeamDocsPage({ params }: TeamDocsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  const dict = (await getDictionary(locale, "teamDocs")) as TeamDocsDictionary;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">{dict.title}</h1>
        <p className="text-slate-600">{dict.intro}</p>
      </header>

      <section className="space-y-8">
        {dict.sections?.map((section, index) => (
          <article key={index} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              {section.heading}
            </h2>
            <p className="text-slate-700 whitespace-pre-line">
              {section.content}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
