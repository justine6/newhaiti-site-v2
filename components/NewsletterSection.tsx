'use client';

import { useState } from 'react';
import Link from 'next/link';

type NewsletterSectionProps = {
  locale: string;
  dictionary: {
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
  };
  joinLabel: string;
};

export default function NewsletterSection({
  locale,
  dictionary,
  joinLabel,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send email to backend
    setEmail('');
  };

  return (
    <section className="bg-blue-50 py-16 text-center px-4">
      {/* Join Button */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <Link href={`/${locale}/join`}>
          <span className="inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 hover:bg-red-700 transition-transform cursor-pointer">
            {joinLabel}
          </span>
        </Link>
      </div>

      {/* Newsletter Text */}
      <h2 className="text-4xl font-bold text-blue-900">{dictionary.newsletterTitle}</h2>
      <p className="mt-4 text-blue-800 text-lg">{dictionary.newsletterDescription}</p>

      {/* Newsletter Form */}
      <form
        onSubmit={handleSubscribe}
        className="mt-8 flex justify-center items-center flex-wrap gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder={dictionary.newsletterPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md border border-blue-300 flex-grow min-w-[250px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {dictionary.newsletterButton}
        </button>
      </form>
    </section>
  );
}
