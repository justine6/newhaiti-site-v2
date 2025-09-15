// app/[locale]/page.tsx

import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import type { HomeDictionary } from "@/lib/i18n/types";

import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ProjectsSection from "@/components/ProjectsSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export async function generateMetadata() {
  return {
    title: "Team Haiti 2075",
    description: "Restoring Dignity. Rebuilding Hope.",
  };
}

// ✅ Make params async-compatible
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale as Locale, "home");

  if (
    !dictionary ||
    !("hero" in dictionary) ||
    !("mission" in dictionary) ||
    !("projects" in dictionary) ||
    !("newsletter" in dictionary) ||
    !("contact" in dictionary) ||
    !("footer" in dictionary)
  ) {
    return (
      <main className="p-10 text-red-600">
        <h1>Missing or invalid home.json translation</h1>
        <p>
          Check <code>content/home/{locale}.json</code> and ensure all required
          sections exist.
        </p>
      </main>
    );
  }

  const homeDict = dictionary as HomeDictionary;

  return (
    <>
      {/* ✅ Universal mapping for HeroSection across EN/FR/HT/ES */}
      <HeroSection
        dictionary={{
          title: homeDict.hero.title,
          subtitle: homeDict.hero.subtitle,
          ctaPrimaryLabel: homeDict.hero.joinNow,     // → Join button
          ctaSecondaryLabel: homeDict.hero.readMore,  // → Vision button
        }}
        locale={locale}
      />

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
}
