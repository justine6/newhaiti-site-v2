'use client';

import { useState } from 'react';
import Link from 'next/link';

type NewsletterDictionary = {
  title?: string;
  description?: string;
  placeholder?: string;
  subscribe?: string;
};

type NewsletterSectionProps = {
  dictionary?: NewsletterDictionary;
  locale: string;
};

export default function NewsletterSection({ dictionary, locale }: NewsletterSectionProps) {
  const title = dictionary?.title ?? "Stay Connected";
  const description =
    dictionary?.description ??
    "Subscribe to receive updates, news, and stories of hope.";
  const placeholder = dictionary?.placeholder ?? "Enter your email";
  const subscribe = dictionary?.subscribe ?? "Subscribe";

  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>

        <form className="mt-4 flex gap-2 justify-center">
          <input
            type="email"
            placeholder={placeholder}
            className="w-full max-w-xs border border-blue-200 rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {subscribe}
          </button>
        </form>
      </div>
    </section>
  );
}
