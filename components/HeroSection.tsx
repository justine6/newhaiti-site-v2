'use client';

import Link from 'next/link';
import Image from 'next/image';

type HeroSectionProps = {
  locale: string;
  dictionary: {
    title: string;
    subtitle: string;
    ctaJoin: string;
    ctaRead: string;
  };
};

export default function HeroSection({ locale, dictionary }: HeroSectionProps) {
  return (
    <section className="relative text-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Haiti map background image */}
      <div
        className="absolute inset-0 bg-no-repeat animate-zoom-once"
        style={{
          backgroundImage: "url(/images/haiti-hero-map.jpg)",
          backgroundSize: "cover", // ✅ Updated to cover
          backgroundPosition: "center",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-8 animate-fade-in">
        <Image
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          width={160}
          height={160}
          className="rounded-full shadow-lg mx-auto mb-6"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg">
          {dictionary.title}
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          {dictionary.subtitle}
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center animate-buttons mt-6">
          <Link
            href={`/${locale}/vision`}
            className="bg-white text-red-600 px-8 py-4 text-lg md:text-xl rounded-full font-bold shadow-xl hover:scale-110 hover:shadow-2xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            {dictionary.ctaRead}
          </Link>
          <Link
            href={`/${locale}/join`}
            className="bg-red-600 text-white px-8 py-4 text-lg md:text-xl rounded-full font-bold shadow-xl hover:scale-110 hover:shadow-2xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            {dictionary.ctaJoin}
          </Link>
        </div>
      </div> {/* ✅ closes content wrapper */}
    </section>  // ✅ closes HeroSection
  );
}
