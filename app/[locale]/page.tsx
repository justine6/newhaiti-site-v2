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

export default function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.reloadResources(i18n.language);
  }, []);

  return (
    <div className="relative min-h-screen">

      <HeroSection t={t} />
      <AboutSection t={t} />
      <ProjectsSection t={t} />
      <ContactSection t={t} />
      <NewsletterSection t={t} />
      <ScrollToTop />
    </div>
  );
}
