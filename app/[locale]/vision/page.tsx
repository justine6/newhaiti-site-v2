// app/[locale]/vision/page.tsx
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n/get-dictionary";

type VisionPageParams = {
  locale?: Locale;
};

type VisionPageProps = {
  // Next 15: params can be Promise-like or plain object
  params: Promise<VisionPageParams> | VisionPageParams;
};

type VisionSection = {
  heading?: string;
  content?: string;
};

type VisionVideo = {
  title?: string;
  url?: string;
  caption?: string;
};

type VisionDictionary = {
  title?: string;
  intro?: string;
  description?: string;
  sections?: VisionSection[];
  videos?: VisionVideo[];
  cta?: string;
  donateCta?: string;
};

function toEmbedUrl(raw?: string): string | null {
  if (!raw) return null;

  try {
    if (raw.includes("/embed/")) return raw;

    const url = new URL(raw);
    const host = url.hostname.toLowerCase();

    // YouTube short links
    if (host.includes("youtu.be")) {
      return `https://www.youtube.com/embed${url.pathname}`;
    }

    // YouTube watch links
    if (host.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const parts = url.pathname.split("/").filter(Boolean);
      const last = parts[parts.length - 1];
      if (last) return `https://www.youtube.com/embed/${last}`;
    }

    // Vimeo
    if (host.includes("vimeo.com")) {
      const parts = url.pathname.split("/").filter(Boolean);
      const id = parts[parts.length - 1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    // Fallback: assume already embeddable
    return raw;
  } catch {
    return null;
  }
}

export default async function VisionPage({ params }: VisionPageProps) {
  // ✅ Handle Promise-like params (Next 15) and plain object (tests/dev tools)
  const resolved =
    "then" in params ? await params : params;

  const locale = (resolved.locale ?? "en") as Locale;

  const vision = (await getDictionary(locale, "vision")) as VisionDictionary;
  const home = (await getDictionary(locale, "home")) ?? {};
  const hero = (home as any).hero ?? {};

  const title =
    vision.title ?? "Our Vision for Ayiti 2075";

  const intro =
    vision.intro ??
    vision.description ??
    "We believe in unity, dignity, and long-term nation building through community-led projects.";

  const description =
    vision.description && vision.description !== intro
      ? vision.description
      : undefined;

  const sections: VisionSection[] = Array.isArray(vision.sections)
    ? vision.sections
    : [];

  const videos = (vision.videos ?? [])
    .map((v, index) => {
      const embed = toEmbedUrl(v.url);
      if (!embed) return null;
      return {
        index,
        title: v.title ?? `Video ${index + 1}`,
        embedUrl: embed,
        caption: v.caption,
      };
    })
    .filter(Boolean) as {
    index: number;
    title: string;
    embedUrl: string;
    caption?: string;
  }[];

  const primaryVideo = videos[0];
  const secondaryVideos = videos.slice(1);

  const stripeDonateUrl = process.env.NEXT_PUBLIC_STRIPE_DONATE_URL ?? "";
  const hasStripeDonate = stripeDonateUrl.trim().length > 0;

  const joinLabel =
    vision.cta ?? hero.joinNow ?? "Join the Movement";

  const donateLabel =
    vision.donateCta ?? hero.donateLabel ?? "Donate";

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      {/* Intro */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          {intro}
        </p>
        {description && (
          <p className="mt-2 text-base text-gray-600">
            {description}
          </p>
        )}
      </section>

      {/* Key pillars / sections */}
      {sections.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Key pillars of the vision
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {sections.map((section, index) => (
              <article
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {section.heading ?? `Pillar ${index + 1}`}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Vision videos */}
      {videos.length > 0 && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">
              Watch the Vision
            </h2>
            <p className="text-sm text-gray-600">
              Learn more through stories, updates, and community voices.
            </p>
          </div>

          {/* Primary video */}
          {primaryVideo && (
            <div className="max-w-3xl mx-auto space-y-2">
              <h3 className="text-center text-lg font-semibold">
                {primaryVideo.title}
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
                <iframe
                  className="w-full h-full"
                  src={primaryVideo.embedUrl}
                  title={primaryVideo.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              {primaryVideo.caption && (
                <p className="text-center text-xs text-gray-600 mt-1">
                  {primaryVideo.caption}
                </p>
              )}
            </div>
          )}

          {/* Secondary videos (if any) */}
          {secondaryVideos.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2">
              {secondaryVideos.map((video) => (
                <article
                  key={video.index}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-semibold text-gray-900">
                    {video.title}
                  </h3>
                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md bg-black">
                    <iframe
                      className="w-full h-full"
                      src={video.embedUrl}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  {video.caption && (
                    <p className="text-xs text-gray-600">
                      {video.caption}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Call-to-action buttons */}
      <section className="flex justify-center pt-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Join button */}
          <Link
            href={`/${locale}/join`}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-10 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-red-700"
          >
            {joinLabel}
          </Link>

          {/* Donate button – only if Stripe URL is configured */}
          {hasStripeDonate && (
            <a
              href={stripeDonateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-rose-600 px-8 py-3 text-base font-semibold text-rose-700 shadow-sm transition hover:bg-rose-600 hover:text-white"
            >
              <span className="mr-2">❤️</span>
              <span>{donateLabel}</span>
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
