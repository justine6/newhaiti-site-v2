'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

type HeroSectionProps = {
  dictionary: {
    title: string;
    subtitle: string;
    readMore: string;
    joinNow: string;
  };
};

export default function HeroSection({ dictionary }: HeroSectionProps) {
  const { locale } = useParams();

  return (
    <section
      className="relative text-white flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url('/images/haiti-hero-map.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '90vh',
        maxHeight: '100vh',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <img
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          className="mx-auto mb-6 w-32 h-32"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {dictionary.title}
        </h1>
        <p className="text-lg md:text-2xl mb-6">{dictionary.subtitle}</p>

        <div className="flex gap-4 justify-center">
          <Link
            href="https://nouvo-ayiti-2075-blogs.vercel.app"
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            {dictionary.readMore}
          </Link>
          <Link
            href={`/${locale}/join`}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            {dictionary.joinNow}
          </Link>
        </div>
      </div>
    </section>
  );
}
