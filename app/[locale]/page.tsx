// app/[locale]/page.tsx
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { locales } from '@/i18n/settings';
type Locale = (typeof locales)[number];

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import BlogPreview from '@/components/BlogPreview';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';

type Dictionary = {
  hero: any;
  about: any;
  projects: any;
  blog: any;
  contact: any;
  footer: any;
};

export default async function Page({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params); // ✅ Correct async usage
  const dictionary = await getDictionary(locale as Locale);

  return (
    <main>
      <HeroSection dictionary={dictionary.hero} />
      <AboutSection dictionary={dictionary.about} />
      <ProjectsGrid dictionary={dictionary.projects} />
      <BlogPreview dictionary={dictionary.blog} />
      <ContactCard dictionary={dictionary.contact} />
      <Footer dictionary={dictionary.footer} />
    </main>
  );
}
