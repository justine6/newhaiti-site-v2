// app/[locale]/videos/page.tsx
import { getDictionary, type Locale } from "@/lib/i18n/get-dictionary";

type RouteParams = {
  locale?: Locale;
};

type Props = {
  // Next 15: params is Promise-like
  params: Promise<RouteParams> | RouteParams;
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
    // If it's already an /embed/ URL, keep it
    if (raw.includes("/embed/")) return raw;

    const url = new URL(raw);
    const host = url.hostname.toLowerCase();

    // youtu.be/VIDEO_ID
    if (host.includes("youtu.be")) {
      return `https://www.youtube.com/embed${url.pathname}`;
    }

    // youtube.com/watch?v=VIDEO_ID
    if (host.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Fallback: return as-is
    return raw;
  } catch {
    return raw ?? null;
  }
}

export default async function VideosPage(rawProps: Props) {
  // Support both Promise-like params and plain object (dev tools / tests)
  const resolved =
    "then" in rawProps.params
      ? await rawProps.params
      : rawProps.params;

  const locale = (resolved.locale ?? "en") as Locale;

  const dict = (await getDictionary(locale, "videos")) as VideosDictionary;

  const videos = (dict.items ?? [])
    .filter((v) => v?.embedUrl)
    .map((v, index) => ({
      index,
      title: v.title ?? `Video ${index + 1}`,
      embedUrl: toEmbedUrl(v.embedUrl),
    }))
    .filter((v) => v.embedUrl !== null);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
      {/* Page heading */}
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {dict.title ?? "Videos"}
        </h1>

        {dict.description && (
          <p className="mt-3 text-lg text-gray-600">
            {dict.description}
          </p>
        )}
      </header>

      {/* Video grid */}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {videos.map((video) => (
          <article key={video.index} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {video.title}
            </h2>

            <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-xl">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full rounded-2xl"
                  src={video.embedUrl!}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Video {video.index + 1} of {videos.length}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
