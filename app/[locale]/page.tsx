import { getDictionary } from '@/lib/i18n/get-dictionary';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import type { Locale } from '@/lib/i18n/settings';


type Props = {
  params: { locale: Locale };
};

export default async function Page({ params: { locale } }: Props) {
  const t = await getDictionary(locale);

  return (
    <>
      <HeroSection dictionary={t.hero} />
      <NewsletterSection locale={locale} />
    </>
  );
}
