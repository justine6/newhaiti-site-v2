// app/[locale]/videos/page.tsx
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import type { VideosDictionary } from "@/lib/i18n/types";
import VideoEmbed from "@/components/VideoEmbed";

export default async function VideosPage({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const dictionary = await getDictionary(locale as Locale, "videos");

  if (!dictionary) {
    return (
      <main className="p-10 text-red-600">
        Missing <code>videos.json</code> for {locale}
      </main>
    );
  }

  const dict = dictionary as VideosDictionary;

  return (
    <main className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{dict.intro}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {dict.videos?.map((v, i) => (
          <div key={i} className="space-y-2">
            <VideoEmbed url={v.url} title={v.title} />
            <p className="font-medium">{v.title}</p>
            {v.caption && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{v.caption}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
