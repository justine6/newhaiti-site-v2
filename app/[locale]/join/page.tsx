import { getDictionary } from '@/lib/i18n/get-dictionary';
import { normalizeLocale } from '@/lib/i18n/settings';
import type { JoinDictionary } from '@/lib/i18n/types';
import JoinForm from '@/components/JoinForm';

type JoinRouteParams = { locale?: string };

type JoinPageProps = {
  params: Promise<JoinRouteParams>;
};

export default async function JoinPage({ params }: JoinPageProps) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  const dict = (await getDictionary(locale, 'join')) as JoinDictionary;

  const hero = dict?.hero ?? {};
  const form = dict?.form ?? {};

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* -------- HERO -------- */}
      <section className="space-y-3">
        {hero.eyebrow && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            {hero.eyebrow}
          </p>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          {hero.title ?? 'Join the Movement'}
        </h1>

        <p className="text-base sm:text-lg text-slate-700">
          {hero.subtitle ??
            'Be part of the vision. Sign up today to support and connect with us.'}
        </p>

        {hero.highlight && (
          <p className="text-sm sm:text-base text-blue-700 font-medium">
            {hero.highlight}
          </p>
        )}
      </section>

      {/* -------- FORM CARD -------- */}
      <section className="bg-white shadow-sm rounded-xl border border-slate-200 p-6 sm:p-8">
        {form.title && (
          <h2 className="text-xl font-semibold text-slate-900 mb-1">
            {form.title}
          </h2>
        )}

        {form.description && (
          <p className="text-sm text-slate-600 mb-6">{form.description}</p>
        )}

        {/* 👇 THIS IS NOW THE ONLY FORM */}
        <JoinForm
          labels={{
            nameLabel: form.nameLabel,
            emailLabel: form.emailLabel,
            phoneLabel: form.phoneLabel,
            locationLabel: form.locationLabel,
            messageLabel: form.messageLabel,
            submitLabel: form.submitLabel,
            successMessage: form.successMessage,
          }}
        />
      </section>
    </main>
  );
}
