import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection'; // ✅ This now renders the real homepage

export const metadata: Metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default function HomePage() {
  return <HeroSection />;
}
