import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/types';
import type { JoinDictionary } from '@/lib/i18n/types';
import JoinFormClient from '@/components/ui/JoinFormClient';


export default async function JoinPage({ params }: { params: { locale: Locale } }) {
  // ✅ Fix for Next.js 15 dynamic route param handling
  const { locale } = await Promise.resolve(params);
  const dictionary = (await getDictionary(locale, 'join')) as JoinDictionary | null;

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
    <h1 className="text-3xl font-bold text-center mb-4">
      {heading}
    </h1>
    <p className="text-center mb-8">
      {intro}
    </p>

      {/* ✅ Join form component */}
      <JoinFormClient />
    </main>
  );
}
