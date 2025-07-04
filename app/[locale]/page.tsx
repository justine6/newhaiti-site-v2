import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MissionSection from '@/components/MissionSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import ContactCard from '@/components/ContactCard';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsGrid />
      <AboutSection />
      <MissionSection />
      <ContactCard />
      <NewsletterSignup />
    </>
  );
}
