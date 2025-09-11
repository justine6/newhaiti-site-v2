// app/[locale]/contact/page.tsx
import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';

type Props = { params: { locale: string } };

export default async function ContactPage({ params }: Props) {
  // appease Next 15 dynamic params rule
  const { locale } = await Promise.resolve(params);
  const dict = await getDictionary(locale as Locale, 'home'); // we read contact block from home.json
  const c = dict?.contact;

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-4">{c?.heading ?? 'Contact Us'}</h1>
      <p className="text-muted-foreground mb-8">
        {c?.description ?? 'Reach out to share your ideas, questions, or collaboration opportunities.'}
      </p>
      {/* You can drop your form here later */}
    </main>
  );
}
