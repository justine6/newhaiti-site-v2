import './globals.css';
import { Metadata } from 'next';

import Topbar from '@/components/navigation/Topbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MissionSection from '@/components/MissionSection';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default async function Page({ params }: { params: { locale: string } }) {
  await Promise.resolve(params); // Optional, just here for potential i18n

  return (
    <>
      <Topbar />
      <HeroSection />
      <ProjectsGrid />
      <AboutSection />
      <MissionSection />
    </>
  );
}
