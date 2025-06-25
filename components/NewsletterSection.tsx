'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-blue-50 py-16 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
        {t('newsletter.heading')}
      </h2>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder={t('newsletter.placeholder') || ''}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-4 py-3 w-full md:w-2/3 rounded-full border border-gray-300 focus:outline-none"
          required
        />
        <Button
          type="submit"
          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
        >
          {t('newsletter.button')}
        </Button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600 text-sm">
          {t('newsletter.confirmation') || 'Thank you for subscribing!'}
        </p>
      )}
    </section>
  );
}
