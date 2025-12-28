'use client';

import { useState } from 'react';

export default function JoinForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, location, message }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setSuccessMessage(
        data?.message ??
          'Mèsi anpil! Your registration was received. Please check your email for confirmation.'
      );

      // reset fields
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* your fields stay the same… */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Join Now'}
      </button>

      {successMessage && (
        <p className="mt-4 text-green-600 text-sm font-medium">
          ✅ {successMessage}
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm font-medium">
          ❌ {error}
        </p>
      )}
    </form>
  );
}
