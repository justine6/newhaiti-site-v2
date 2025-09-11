import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import type { HomeDictionary } from '@/lib/i18n/types';
import ProjectsSection from '@/components/ProjectsSection';


import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export async function generateMetadata() {
  return {
    title: 'Team Haiti 2075',
    description: 'Restoring Dignity. Rebuilding Hope.',
  };
}

type Props = {
  params: {
    locale: string;
  };
};

export default async function HomePage({ params }: Props) {
  const { locale } = await Promise.resolve(params);
  const dictionary = await getDictionary(locale as Locale, 'home');

  const hasRequiredSections =
    dictionary &&
    'hero' in dictionary &&
    'mission' in dictionary &&
    'projects' in dictionary &&
    'newsletter' in dictionary &&
    'contact' in dictionary &&
    'footer' in dictionary;

  if (!hasRequiredSections) {
    return (
      <main className="p-10 text-red-600">
        <h1>Missing or invalid home.json translation</h1>
        <p>
          Check <code>content/articles/{locale}/home.json</code> and ensure all
          required sections exist.
        </p>
      </main>
    );
  }

  const homeDict = dictionary as HomeDictionary;

return (
  <>
    <HeroSection dictionary={homeDict.hero} locale={locale} />
    <MissionSection dictionary={homeDict.mission} />
    <ProjectsSection dictionary={homeDict.projects} />
    <NewsletterSection
      dictionary={homeDict.newsletter}
      joinLabel={homeDict.hero.joinNow}
      locale={locale}
    />
    <ContactSection dictionary={homeDict.contact} locale={locale} />
    <Footer dictionary={homeDict.footer} />
  </>
);
} // ✅ closes the HomePage function


