'use client';

type BlogPreviewProps = {
  dictionary: {
    title: string;
    subtitle?: string;
    readMore?: string;
  };
};

export default function BlogPreview({ dictionary }: BlogPreviewProps) {
  return (
    <section className="py-16 px-4 text-center bg-white">
      <h2 className="text-3xl font-bold mb-4">
        {dictionary.title || 'Latest Articles'}
      </h2>
      {dictionary.subtitle && (
        <p className="text-lg text-gray-600 mb-8">
          {dictionary.subtitle}
        </p>
      )}
      <a
        href="/blog"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {dictionary.readMore || 'Read More'}
      </a>
    </section>
  );
}
