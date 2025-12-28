// components/JoinForm.tsx
'use client';

import { useState, FormEvent } from 'react';

type JoinFormLabels = {
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  locationLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
};

type JoinFormProps = {
  labels: JoinFormLabels;
};

export default function JoinForm({ labels }: JoinFormProps) {
  // Local copies with safe fallbacks
  const {
    nameLabel = 'Full name',
    emailLabel = 'Email',
    phoneLabel = 'Phone (optional)',
    locationLabel = 'City / Country',
    messageLabel = 'Message (optional)',
    submitLabel = 'Join the movement',
    submittingLabel = 'Sending…',
    successMessage = 'Thank you for joining! You will receive a confirmation email shortly.',
  } = labels || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setIsSubmitted(false);

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, location, message }),
      });

      const data = await res.json().catch(() => ({} as any));
      console.log('📡 /api/join response:', res.status, data);

      if (!res.ok) {
        setError(
          data?.error ||
            `Server error (status ${res.status}). Please try again later.`,
        );
        return;
      }

      // Success
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setMessage('');
    } catch (err) {
      console.error('❌ /api/join network error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {nameLabel}
        </label>
        <input
          name="name"
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {emailLabel}
        </label>
        <input
          type="email"
          name="email"
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {phoneLabel}
        </label>
        <input
          name="phone"
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {locationLabel}
        </label>
        <input
          name="location"
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {messageLabel}
        </label>
        <textarea
          name="message"
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm min-h-[96px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </button>

      {/* Success / error messages */}
      {isSubmitted && !error && (
        <p className="mt-4 text-xs sm:text-sm text-green-600 font-medium">
          ✅ {successMessage}
        </p>
      )}

      {error && (
        <p className="mt-4 text-xs sm:text-sm text-red-500 font-medium">
          ❌ {error}
        </p>
      )}
    </form>
  );
}
