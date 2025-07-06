import { getDictionary } from '@/lib/i18n/get-dictionary';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import type { Locale } from '@/lib/i18n/settings';
import type { HomeDictionary } from '@/lib/i18n/types';

// ✅ Define Props normally
type Props = {
  params: { locale: Locale };
};

export default async function Page({ params }: Props) {
  const locale = params.locale; // ✅ use directly, no await

  const t = (await getDictionary(locale, 'home')) as HomeDictionary;

  if (!t?.hero) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Content unavailable</h1>
        <p>Missing or invalid translation file for "home".</p>
      </main>
    );
  }

  return (
    <>
      <HeroSection dictionary={t.hero} />
      <NewsletterSection locale={locale} />
    </>
  );
}
