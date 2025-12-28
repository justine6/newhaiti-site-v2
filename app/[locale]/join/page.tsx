// app/[locale]/join/page.tsx
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale } from "@/lib/i18n/settings";
import type { JoinDictionary } from "@/lib/i18n/types";

type JoinRouteParams = {
  locale?: string;
};

type JoinPageProps = {
  // In Next 15, params behaves like a Promise, so we await it
  params: Promise<JoinRouteParams>;
};

export default async function JoinPage({ params }: JoinPageProps) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  // Load only the join section (join.json) for this locale
  const joinDict = (await getDictionary(locale, "join")) as JoinDictionary;

  const hero = joinDict?.hero ?? {};
  const form = joinDict?.form ?? {};

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Hero */}
      <section className="space-y-3">
        {hero.eyebrow && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            {hero.eyebrow}
          </p>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          {hero.title ?? "Join the Movement"}
        </h1>

        <p className="text-base sm:text-lg text-slate-700">
          {hero.subtitle ??
            "Be part of the vision. Sign up today to support and connect with us."}
        </p>

        {hero.highlight && (
          <p className="text-sm sm:text-base text-blue-700 font-medium">
            {hero.highlight}
          </p>
        )}
      </section>

      {/* Form */}
      <section className="bg-white shadow-sm rounded-xl border border-slate-200 p-6 sm:p-8">
        {form.title && (
          <h2 className="text-xl font-semibold text-slate-900 mb-1">
            {form.title}
          </h2>
        )}

        {form.description && (
          <p className="text-sm text-slate-600 mb-6">{form.description}</p>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {form.nameLabel ?? "Full name"}
            </label>
            <input
              name="name"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {form.emailLabel ?? "Email"}
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {form.phoneLabel ?? "Phone (optional)"}
            </label>
            <input
              name="phone"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {form.locationLabel ?? "City / Country"}
            </label>
            <input
              name="location"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {form.messageLabel ?? "Message (optional)"}
            </label>
            <textarea
              name="message"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm min-h-[96px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            {form.submitLabel ?? "Join the movement"}
          </button>
        </form>
      </section>
    </main>
  );
}
