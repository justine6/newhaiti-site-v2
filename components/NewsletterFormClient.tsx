// components/NewsletterFormClient.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  placeholder: string;
  buttonText: string;
  successMessage: string;
};

export default function NewsletterFormClient({ placeholder, buttonText, successMessage }: Props) {
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
    <>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="px-4 py-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        />
        <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          {buttonText}
        </Button>
      </form>

      {submitted && (
        <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
      )}
    </>
  );
}
