import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection'; // ✅ Make sure this exists and is correct

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default function HomePage() {
  return <HeroSection />; // ✅ Replace the placeholder with the real Hero section
}
