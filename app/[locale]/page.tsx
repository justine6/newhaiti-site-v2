import './globals.css';
import { Metadata } from 'next';

import Topbar from '@/components/navigation/Topbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MissionSection from '@/components/MissionSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import ContactCard from '@/components/ContactCard';
import NewsletterSignup from '@/components/NewsletterSignup'; // ✅ Added import

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default async function Page({ params }: { params: { locale: string } }) {
  await Promise.resolve(params); // For potential i18n

  return (
    <>
      <Topbar />
      <HeroSection />
      <ProjectsGrid />
      <AboutSection />
      <MissionSection />
      <ContactCard />
      <NewsletterSignup /> {/* ✅ Added component usage */}
    </>
  );
}
