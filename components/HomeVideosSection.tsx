// components/HomeVideosSection.tsx
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type HomeVideosSectionProps = {
  locale: string;
};

type VideoItem = {
  title?: string;
  embedUrl?: string;
};

type VideosDictionary = {
  title?: string;
  description?: string;
  items?: VideoItem[];
};

function toEmbedUrl(raw?: string): string | null {
  if (!raw) return null;

  try {
    if (raw.includes("/embed/")) return raw;

    const url = new URL(raw);
    const host = url.hostname.toLowerCase();

    // youtu.be/ID
    if (host.includes("youtu.be")) {
      return `https://www.youtube.com/embed${url.pathname}`;
    }

    // youtube.com/watch?v=ID
    if (host.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // fallback: assume it’s already embeddable
    return raw;
  } catch {
    return null;
  }
}

export default async function HomeVideosSection({
  locale,
}: HomeVideosSectionProps) {
  const dict = (await getDictionary(locale, "videos")) as VideosDictionary;

  const videos = (dict.items ?? [])
    .filter((v) => v?.embedUrl)
    .slice(0, 2)
    .map((v) => ({
      ...v,
      embedUrl: toEmbedUrl(v.embedUrl),
    }));

  if (!videos.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {dict.title ?? "Latest Videos"}
          </h2>
          {dict.description && (
            <p className="mt-1 text-sm text-gray-600">
              {dict.description}
            </p>
          )}
        </div>
        <Link
          href={`/${locale}/videos`}
          className="hidden sm:inline-flex rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          View all videos
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {videos.map((video, index) =>
          !video.embedUrl ? null : (
            <article key={index} className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">
                {video.title ?? `Video ${index + 1}`}
              </h3>
              <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow">
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute inset-0 h-full w-full rounded-2xl"
                    src={video.embedUrl}
                    title={video.title ?? `Video ${index + 1}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </article>
          )
        )}
      </div>

      {/* Mobile "view all" */}
      <div className="mt-6 sm:hidden text-center">
        <Link
          href={`/${locale}/videos`}
          className="inline-flex rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          View all videos
        </Link>
      </div>
    </section>
  );
}
