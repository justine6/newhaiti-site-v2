// app/[locale]/page.tsx
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type LocaleHomeProps = {
  params: { locale?: string };
};

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const locale = (params?.locale ?? "en") as string;

  // Load home.json for this locale, but never crash if missing
  const home = (await getDictionary(locale, "home")) ?? {};

  const heroDict = (home as any).hero ?? {};
  const projectsDict = (home as any).projects ?? {};
  const blogSectionDict = (home as any).blogSection ?? {};
  const newsletterDict = (home as any).newsletter ?? {};

  return (
    <main>
      <HeroSection dictionary={heroDict} locale={locale} />
      <ProjectsSection dictionary={projectsDict} />
      <BlogSection
        locale={locale}
        dictionary={{ blogSection: blogSectionDict }}
      />
      <NewsletterSection dictionary={newsletterDict} locale={locale} />
    </main>
  );
}
