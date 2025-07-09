import { use } from 'react';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/types';
import type { JoinDictionary } from '@/lib/i18n/types';

export default function JoinPage(props: {
  params: { locale: Locale };
}) {
  // ✅ Unwrap params using `use()` to satisfy Next.js 15 rules
  const { locale } = use(Promise.resolve(props.params));
  const dictionary = use(getDictionary(locale, 'join')) as JoinDictionary | null;

  if (!dictionary) {
    return (
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-red-600">Join Page Not Found</h1>
        <p>Please check your translation files.</p>
      </main>
    );
  }

  const { heading, intro, steps, callToAction } = dictionary;

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{heading}</h1>
      <p className="text-lg text-gray-700 mb-6">{intro}</p>

      <ul className="list-disc ml-6 text-gray-800 space-y-2">
        <li>{steps.step1}</li>
        <li>{steps.step2}</li>
        <li>{steps.step3}</li>
      </ul>

      <div className="mt-8 text-blue-600 font-semibold">{callToAction}</div>
    </main>
  );
}
