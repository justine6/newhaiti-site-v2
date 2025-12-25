import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
// etc...

export default async function LocaleHome({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? "en";

  return (
    <main>
      <HeroSection locale={locale} />
      <ProjectsSection locale={locale} />
      <BlogSection locale={locale} />
    </main>
  );
}
