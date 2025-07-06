import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';

type Props = {
  params: { locale: Locale };
};

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getDictionary(locale, 'about');

  if (!t?.values) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Content unavailable</h1>
        <p>Missing or invalid translation file for "about".</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{t.heading}</h1>

      {t.intro && typeof t.intro === 'string' && (
        <p className="text-lg text-muted-foreground mb-8">
          <span dangerouslySetInnerHTML={{ __html: t.intro }} />
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(t.values).map(([key, value]) => (
          <div
            key={key}
            className="p-4 border border-gray-300 dark:border-zinc-700 rounded"
          >
            <h3 className="text-xl font-semibold">{String(value)}</h3>
          </div>
        ))}
      </section>

      <p className="mt-8 text-center text-xl font-medium">
        {t.callToAction}
      </p>
    </main>
  );
}
