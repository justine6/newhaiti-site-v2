// components/NewsletterSection.tsx

import NewsletterFormClient from './NewsletterFormClient';

type NewsletterDictionary = {
  title: string;
  description: string;
};

type Props = {
  dictionary: NewsletterDictionary;
};

export default function NewsletterSection({ dictionary }: Props) {
  return (
    <section className="bg-blue-50 py-16 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
          {dictionary.title}
        </h2>
        <p className="text-lg text-blue-800 mb-8">
          {dictionary.description}
        </p>

        <NewsletterFormClient />
      </div>
    </section>
  );
}
