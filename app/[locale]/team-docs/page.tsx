import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Locale, languages } from '@/lib/i18n/settings';

import { Metadata } from 'next';

type Props = {
  params: {
    locale: Locale;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.locale, 'teamDocs');

  return {
    title: dict?.metaTitle || 'Ayiti 2075',
    description: dict?.metaDescription || '',
  };
}

export default async function TeamDocsPage({ params }: Props) {
  const locale = languages.includes(params.locale) ? params.locale : 'en';
  const dict = await getDictionary(locale, 'teamDocs');

  if (!dict) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-semibold">⚠️ Could not load team documents.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">{dict.title}</h1>
      <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-10">
        {dict.intro}
      </p>

      <div className="space-y-10">
        {dict.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
              {section.heading}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

