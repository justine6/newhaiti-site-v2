// HeroSection.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

type HeroSectionProps = {
  t: (key: string) => string;
};

export default function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
      <Image
        src="/images/newhaitilogo.png"
        alt="New Haiti Team 2075 Logo"
        width={180}
        height={0}
        sizes="(min-width: 768px) 180px, 120px"
        className="w-[120px] md:w-[180px] h-auto mb-6 rounded-full border-2 border-white shadow-xl bg-white"
      />

      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">{t('hero.title')}</h1>
      <p className="text-lg md:text-2xl mb-8 max-w-2xl text-white">{t('hero.subtitle')}</p>

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
    </section>
  );
}
