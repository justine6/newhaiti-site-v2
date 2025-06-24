'use client';

import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 bg-white text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900">{t('contact_us')}</h2>
        <p className="mt-4 text-gray-600">
          {t('contact_description', 'Reach out to us for partnership, support, or inquiries.')}
        </p>
        <div className="mt-6">
          <a
            href="mailto:info@nouvoayiti2075.com"
            className="text-blue-600 hover:underline"
          >
            info@nouvoayiti2075.com
          </a>
        </div>
      </div>
    </section>
  );
}
export default function ContactSection() {
  return <section className="p-4">Contact section placeholder</section>;
}
