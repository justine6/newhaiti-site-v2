// components/NewsletterSection.tsx

import NewsletterFormClient from './NewsletterFormClient';

type NewsletterDictionary = {
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterSuccessMessage: string;
};

type Props = {
  dictionary: NewsletterDictionary;
};

export default function NewsletterSection({ dictionary }: Props) {
  return (
    <section className="bg-blue-50 py-16 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
          {dictionary.newsletterTitle}
        </h2>
        <p className="text-lg text-blue-800 mb-8">
          {dictionary.newsletterDescription}
        </p>

        <NewsletterFormClient
          placeholder={dictionary.newsletterPlaceholder}
          buttonText={dictionary.newsletterButton}
          successMessage={dictionary.newsletterSuccessMessage}
        />
      </div>
    </section>
  );
}
