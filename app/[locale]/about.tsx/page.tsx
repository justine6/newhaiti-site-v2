import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import type { AboutDictionary } from '@/lib/i18n/types'; // Make sure this has the correct structure

type Props = {
  params: { locale: Locale };
};

export default async function AboutPage({ params: { locale } }: Props) {
  const about = (await getDictionary(locale, 'about')) as AboutDictionary;

  if (!about) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Content unavailable</h1>
        <p>Please check your locale or the translation file for "about".</p>
      </main>
    );
  }

return (
  <main className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-4">
      {about.heading || "About Us"}
    </h1>

    <p className="text-lg text-muted-foreground mb-8">
      <span
        dangerouslySetInnerHTML={{
          __html: about.intro || "Introduction coming soon.",
        }}
      />
    </p>

    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Object.entries(about.values || {}).length > 0 ? (
        Object.entries(about.values).map(([key, value]) => (
          <div
            key={key}
            className="p-4 border border-gray-300 dark:border-zinc-700 rounded"
          >
            <h3 className="text-xl font-semibold">{value as string}</h3>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-muted-foreground">
          Values will be available soon.
        </p>
      )}
    </section>

    <p className="mt-8 text-center text-xl font-medium">
      {about.callToAction || "Stay tuned for more updates."}
    </p>
  </main>
); // closes the JSX return

} // closes the async function AboutPage
