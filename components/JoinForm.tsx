'use client';

import { useState } from 'react';

export default function JoinForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setResponseMessage(data.message);
        setFormData({ name: '', email: '', phone: '', location: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Network error. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Join the Movement</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Your Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="message"
        placeholder="Optional Message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Submitting...' : 'Join Now'}
      </button>

      {status !== 'idle' && (
        <p className={`text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {responseMessage}
        </p>
      )}
    </form>
  );
}
