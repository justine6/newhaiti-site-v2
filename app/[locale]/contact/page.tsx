// app/[locale]/contact/page.tsx
import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import type { HomeDictionary } from '@/lib/i18n/types';
import ContactSection from '@/components/ContactSection';

export const dynamic = 'force-static';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata() {
  return {
    title: 'Contact — Nouvo Ayiti 2075',
    description: 'Reach out to share ideas, questions, or collaboration opportunities.',
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await Promise.resolve(params);
  // Reuse the contact block from the home dictionary
  const dict = (await getDictionary(locale, 'home')) as HomeDictionary | null;

  if (!dict || !dict.contact) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Contact unavailable</h1>
        <p>
          Please check <code>content/articles/{locale}/home.json</code> and ensure the
          <code> contact </code> section exists.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">{dict.contact.heading}</h1>
      <p className="text-muted-foreground mb-8">{dict.contact.description}</p>
      <ContactSection dictionary={dict.contact} />
    </main>
  );
}
