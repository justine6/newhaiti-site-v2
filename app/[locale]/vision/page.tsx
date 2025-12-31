import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type VisionPageProps = {
  params: { locale?: string };
};

export default async function VisionPage({ params }: VisionPageProps) {
  const locale = (params?.locale ?? "en") as string;

  // Load vision.json for this locale – safe even if file is missing
  const vision = (await getDictionary(locale, "vision")) ?? {};
  const home = (await getDictionary(locale, "home")) ?? {};
  const hero = (home as any).hero ?? {};

  const title =
    (vision as any).title ?? "Our Vision for a New Haiti";

  const description =
    (vision as any).description ??
    "We believe in unity, dignity, and long-term nation building through community-led projects.";

  const joinLabel =
    (vision as any).cta ?? hero.joinNow ?? "Join the Movement";

  const donateLabel =
    (vision as any).donateCta ?? hero.donate ?? "Donate";

  const highlights: string[] = Array.isArray((vision as any).highlights)
    ? (vision as any).highlights
    : [];

  const stripeDonateUrl = process.env.NEXT_PUBLIC_STRIPE_DONATE_URL ?? "";
  const hasStripeDonate = stripeDonateUrl.trim().length > 0;

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      {/* Intro */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          {description}
        </p>
      </section>

      {/* Highlights / Pillars */}
      {highlights.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Key pillars of the vision
          </h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-700 list-disc list-inside">
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Vision Video */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          Watch the Vision
        </h2>
        <p className="text-center text-gray-700 text-sm">
          Watch the official New Haiti 2075 vision message.
        </p>

        <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/brCFRyzM90s"
            title="New Haiti 2075 Vision Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* CTA */}
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
