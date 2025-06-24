'use client';
import ContactSection from '@/components/ContactSection';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectsSection from '@/components/ProjectsSection';
import ScrollToTop from '@/components/ScrollToTop';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import i18n from '@/i18n/client';
import NewsletterSection from '@/components/NewsletterSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import NavBar from '@/components/NavBar';

export default function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.reloadResources(i18n.language);
  }, []);

  return (
    <div className="relative min-h-screen">
      <NavBar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[80vh] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/haiti-map.jpg")' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 pt-32 pb-20 bg-black/60"
        >
          <Image
            src="/images/newhaitilogo.png"          <Image
            src="/images/newhaitilogo.png"
            alt="New Haiti 2075 Logo"
            width={0}
            height={0}
            sizes="(min-width: 768px) 180px, 120px"
            className="w-[120px] md:w-[180px] h-auto mb-6 rounded-full border-2 border-white shadow-xl bg-white"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl text-white">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4">
            <Button className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-transform duration-300 shadow-lg px-6>              {t('buttons.join')}
            </Button>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-white/10 hover:scale-105 transition-transform duration-300 px-6 p>
            >
              {t('buttons.read')}
            </Button>
          </div>
            alt="New Haiti 2075 Logo"
            width={0}
            height={0}
            sizes="(min-width: 768px) 180px, 120px"
            className="w-[120px] md:w-[180px] h-auto mb-6 rounded-full border-2 border-white shadow-xl bg-white"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl text-white">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4">
            <Button className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-transform duration-300 shadow-lg px-6 py-3 text-lg rounded-full">
              {t('buttons.join')}
            </Button>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-white/10 hover:scale-105 transition-transform duration-300 px-6 py-3 text-lg rounded-full"
            >
              {t('buttons.read')}
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <NewsletterSection />
      <ScrollToTop />
    </div>
  );
}
