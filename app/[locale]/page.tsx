import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import type { HomeDictionary } from '@/lib/i18n/types';

import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const dictionary = await getDictionary(params.locale, 'home') as HomeDictionary;

  return (
    <>
      <HeroSection dictionary={dictionary.hero} />
      <MissionSection dictionary={dictionary.mission} />
      <NewsletterSection dictionary={dictionary.newsletter} />
      <ContactSection dictionary={dictionary.contact} />
      <Footer dictionary={dictionary.footer} />
    </>
  );
}
