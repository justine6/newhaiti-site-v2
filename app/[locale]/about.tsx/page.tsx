import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';

type Props = {
  params: { locale: Locale };
};

export default async function AboutPage({ params: { locale } }: Props) {
  const about = await getDictionary(locale, 'about');

  if (!about) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Content unavailable</h1>
        <p>Please check your locale or the translation file for "about".</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{about.heading}</h1>
      <p className="text-lg text-muted-foreground mb-8">{about.intro}</p>

      <section className="space-y-4">
        {about.values?.map((value: string, idx: number) => (
          <p key={idx} className="text-md">
            {value}
          </p>
        ))}
      </section>
    </main>
  );
}
