// components/JoinForm.tsx
'use client';

import { useState } from 'react';

export default function JoinForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, location, message }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setLocation('');
        setMessage('');
      } else {
        const result = await res.json().catch(() => ({}));
        setError(
          result.error ||
            'Something went wrong on the server. Please try again later.'
        );
      }
    } catch (_err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* … your fields exactly as you have them … */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Join Now'}
      </button>

      {isSubmitted && !error && (
        <p className="mt-4 text-green-600 text-sm font-medium">
          ✅ Thank you for joining! If everything is configured correctly,
          you’ll receive a confirmation email shortly.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm font-medium">❌ {error}</p>
      )}
    </form>
  );
}
