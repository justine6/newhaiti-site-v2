// components/ContactSection.tsx
'use client';

type ContactSectionProps = {
  t: (key: string) => string;
};

export default function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 bg-white text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900">{t('contactTitle')}</h2>
        <p className="mt-4 text-gray-600">{t('contactDescription')}</p>

        <div className="mt-6">
          <a
            href="mailto:info@nouvoayiti2075.com"
            className="text-blue-600 hover:underline text-lg"
          >
            info@nouvoayiti2075.com
          </a>
        </div>
      </div>
    </section>
  );
}
