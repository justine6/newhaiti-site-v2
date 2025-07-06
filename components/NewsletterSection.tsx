// components/NewsletterSection.tsx (Server Component)
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Button } from '@/components/ui/button';
import NewsletterFormClient from './NewsletterFormClient';



type Props = {
  locale: string;
};

export default async function NewsletterSection({ locale }: Props) {
  const t = await getDictionary(locale, 'newsletter');

  return (
    <section className="bg-blue-50 py-16 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
          {t.newsletterTitle}
        </h2>
        <p className="text-lg text-blue-800 mb-8">
          {t.newsletterDescription}
        </p>

        <NewsletterFormClient
          placeholder={t.newsletterPlaceholder}
          buttonText={t.newsletterButton}
          successMessage={t.newsletterSuccessMessage}
        />
      </div>
    </section>
  );
}
