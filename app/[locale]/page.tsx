// app/[locale]/page.tsx
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import NewYear2026Section from "@/components/NewYear2026Section";
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";
import HomeVideosSection from "@/components/HomeVideosSection";

import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale } from "@/lib/i18n/settings";
import { fetchBlogFeed } from "@/lib/fetchBlogFeed";

type LocaleRouteParams = {
  locale?: string;
};

type LocaleHomeProps = {
  // Next 15: params is a Promise-like
  params: Promise<LocaleRouteParams>;
};

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  // 🔑 Load home dictionary
  const home = (await getDictionary(locale, "home")) ?? {};

  const heroDict = (home as any).hero ?? {};
  const projectsDict = (home as any).projects ?? {};
  const blogSectionDict = (home as any).blog ?? {};
  const newsletterDict = (home as any).newsletter ?? {};
  const contactDict = (home as any).contact ?? {};

  // 🔹 Fetch blog posts and keep 3 for the preview grid
  const allPosts: any[] = await fetchBlogFeed();
  const previewPosts = Array.isArray(allPosts)
    ? allPosts
        .filter((post) => (post.locale ?? "en") === locale)
        .slice(0, 3)
    : [];

  // 📝 Map home.contact into form text
  const contactFormDictionary = {
    title: contactDict.heading,
    subtitle: contactDict.description,
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Phone (optional)",
    messageLabel: "Message",
    submitLabel: contactDict.cta ?? "Send",
  };

  // 📇 Static team contact details (can be moved to a dedicated dictionary later)
  const contactCardDictionary = {
    title: "Contact the Team",
    emailLabel: "Email",
    emailValue: "nouvoayiti2075@gmail.com",
    phoneLabel: "Phone",
    phoneValue: "+1 (918) 640-8249",
    addressLabel: "Location",
    addressValue: "Worldwide",
  };

  return (
    <main>
      <HeroSection dictionary={heroDict} locale={locale} />

      <NewYear2026Section locale={locale} />

      <ProjectsSection dictionary={projectsDict} />

      {/* 👇 New videos strip on the homepage */}
      <HomeVideosSection locale={locale} />

      <BlogSection
        locale={locale}
        dictionary={{ blogSection: blogSectionDict }}
        posts={previewPosts}
      />

      {/* Contact area: form + newsletter + contact card */}
      <section id="contact" className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
          {/* 1) Visitor contact form */}
          <ContactForm dictionary={contactFormDictionary} />

          {/* 2) Stay Connected (newsletter) */}
          <NewsletterSection dictionary={newsletterDict} locale={locale} />

          {/* 3) Static team contact details */}
          <ContactCard dictionary={contactCardDictionary} />
        </div>
      </section>
    </main>
  );
}
