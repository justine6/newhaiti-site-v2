// app/[locale]/vision/page.tsx
import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import VideoEmbed from '@/components/media/VideoEmbed';

type Props = { params: { locale: Locale } };

export default async function VisionPage(props: Props) {
  // ✅ appease Next 15 dynamic API rule
  const { locale } = await Promise.resolve(props.params);

  // ✅ load the 'vision' dictionary (typed via DictionaryBySection)
  const dict = await getDictionary(locale, 'vision');

  if (!dict) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-2">Vision unavailable</h1>
        <p>
          Missing file:&nbsp;
          <code>content/articles/{locale}/vision.json</code>
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{dict.intro}</p>

      {/* Pillars / sections */}
      <div className="space-y-6 mb-12">
        {dict.sections?.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold mb-1">{s.heading}</h2>
            <p className="text-gray-800 dark:text-gray-200">{s.content}</p>
          </section>
        ))}
      </div>

      {/* Videos */}
      {dict.videos?.length ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Videos</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {dict.videos!.map((v, i) => (
              <div key={i} className="space-y-2">
                <VideoEmbed url={v.url} title={v.title} />
                <p className="font-medium">{v.title}</p>
                {v.caption ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{v.caption}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
