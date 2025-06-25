// components/NewsletterSection.tsx
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
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
          {t('newsletterTitle')}
        </h2>
        <p className="text-lg text-blue-800 mb-8">{t('newsletterDescription')}</p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletterPlaceholder')}
            className="px-4 py-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
          <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            {t('newsletterButton')}
          </Button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 font-medium">{t('newsletterSuccessMessage')}</p>
        )}
      </div>
    </section>
  );
}
