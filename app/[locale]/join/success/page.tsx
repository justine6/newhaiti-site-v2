import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale } from "@/lib/i18n/settings";

type PageProps = {
  params: { locale: string };
};

export default async function JoinSuccessPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale);

  // Reuse existing join dictionary fields so we don’t touch ht/join.json
  const joinDict: any = dict.join ?? {};
  const hero = joinDict.hero ?? {};
  const form = joinDict.form ?? {};

  const title =
    hero.eyebrow ??
    (locale === "en" ? "Thank you for joining the movement" : hero.title);
  const subtitle =
    form.successMessage ??
    hero.subtitle ??
    "Your details have been received. We’ll be in touch soon.";

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <section className="max-w-2xl text-center space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {hero.eyebrow || (locale === "en" ? "Join the movement" : "")}
        </p>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 whitespace-pre-line">
          {subtitle}
        </p>

        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <Link
            href={`/${locale}/projects`}
            className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View the projects
          </Link>
          <Link
            href={`/${locale}`}
            className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
