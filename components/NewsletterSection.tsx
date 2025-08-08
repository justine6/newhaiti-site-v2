'use client';

import { useState } from 'react';
import Link from 'next/link';

type NewsletterSectionProps = {
  locale: string;
  dict: {
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      subscribe: string;
    };
    hero: {
      readVision: string;
      joinMovement: string;
    };
  };
};

export default function NewsletterSection({ locale, dict }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Optional: implement client-side feedback
  };

  return (
    <section className="bg-blue-50 py-16 text-center px-4">
      {/* --- Buttons Section --- */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <Link href={`/${locale}/blog`}>
          <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition">
            {dict.hero.readVision}
          </button>
        </Link>
        <Link href={`/${locale}/join`}>
          <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition">
            {dict.hero.joinMovement}
          </button>
        </Link>
      </div>

      {/* --- Newsletter Text --- */}
      <h2 className="text-4xl font-bold text-blue-900">{dict.newsletter.title}</h2>
      <p className="mt-4 text-blue-800 text-lg">{dict.newsletter.description}</p>

      {/* --- Newsletter Form --- */}
      <form onSubmit={handleSubscribe} className="mt-8 flex justify-center items-center flex-wrap gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder={dict.newsletter.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md border border-blue-300 flex-grow min-w-[250px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {dict.newsletter.subscribe}
        </button>
      </form>
    </section>
  );
}
