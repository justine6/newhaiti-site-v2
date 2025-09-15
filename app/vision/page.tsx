// app/[locale]/vision/page.tsx
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import type { VisionDictionary } from "@/lib/i18n/types";

function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <iframe
      className="w-full aspect-video rounded-lg shadow"
      src={url}
      title={title}
      allowFullScreen
    />
  );
}

export default async function VisionPage({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const dictionary = await getDictionary(locale as Locale, "vision");

  if (!dictionary) {
    return (
      <main className="p-10 text-red-600">
        Missing <code>vision.json</code> for {locale}
      </main>
    );
  }

  const dict = dictionary as VisionDictionary;

  return (
    <main className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{dict.intro}</p>

      <div className="space-y-6 mb-12">
        {dict.sections?.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold mb-1">{s.heading}</h2>
            <p className="text-gray-800 dark:text-gray-200">{s.content}</p>
          </section>
        ))}
      </div>

      {dict.videos?.length ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Videos</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {dict.videos.map((v, i) => (
              <div key={i} className="space-y-2">
                <VideoEmbed url={v.url} title={v.title} />
                <p className="font-medium">{v.title}</p>
                {v.caption && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{v.caption}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
