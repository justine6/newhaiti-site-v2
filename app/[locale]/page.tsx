// ✅ app/[locale]/page.tsx

import { getDictionary } from '@/lib/i18n/get-dictionary';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import type { Locale } from '@/lib/i18n/settings';
import type { HomeDictionary } from '@/lib/i18n/types';

type Props = {
  params: { locale: Locale };
};

export default async function Page({ params }: Props) {
  const { locale } = params;

  const t = (await getDictionary(locale, 'home')) as HomeDictionary;

  return (
    <>
      <HeroSection dictionary={t.hero} />
      <NewsletterSection locale={locale} />
    </>
  );
}
