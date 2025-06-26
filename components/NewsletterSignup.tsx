
'use client';

import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdemdaNjQl58X98C/formResponse';
  const EMAIL_FIELD_NAME = 'entry.263764086';

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Stay Updated</h2>

        {submitted ? (
          <p className="text-green-600 fo
