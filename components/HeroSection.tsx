'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/images/haiti-map.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}

      <div className="relative z-10">
        <img
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          className="mx-auto mb-6 w-32 h-32"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">New Haiti Team 2075</h1>
        <p className="text-lg md:text-2xl mb-6">
          Restoring Dignity. Rebuilding Hope.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/articles/vision-for-haiti-2075"
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Read the Vision
          </Link>
          <Link
            href="/join"
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Join the Movement
          </Link>
        </div>
      </div>
    </section>
  );
}
