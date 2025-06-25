'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/client';

import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import ScrollToTop from '@/components/ScrollToTop';

type LocaleParams = {
  params: {
    locale: string;
  };
};

export default function HomePage({ params }: LocaleParams) {
  const { t } = useTranslation();
  const currentLocale = params.locale;

  useEffect(() => {
    i18n.reloadResources(currentLocale);
  }, [currentLocale]);

  return (
    <div>
      <div style={{ color: 'red' }}>This should appear</div>

      <div className="relative min-h-screen">
        <Navbar currentLocale={currentLocale} />
        {/* <HeroSection t={t} />
        <AboutSection t={t} />
        <ProjectsSection t={t} />
        <ContactSection t={t} />
        <NewsletterSection t={t} /> */}
        <ScrollToTop />
      </div>
    </div>
  );
}
