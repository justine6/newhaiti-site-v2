'use client';

import Link from "next/link";

type BlogPreviewProps = {
  locale?: string;
  dictionary: {
    title: string;
    subtitle?: string;
    readMore?: string;
  };
};

export default function BlogPreview({ locale = "en", dictionary }: BlogPreviewProps) {
  return (
    <section className="py-16 px-4 text-center bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {dictionary.title}
      </h2>

      {dictionary.subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {dictionary.subtitle}
        </p>
      )}

      <Link
        href={`/${locale}/blog`}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform"
      >
        {dictionary.readMore}
      </Link>
    </section>
  );
}
