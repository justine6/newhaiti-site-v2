import Link from "next/link";

type HeroDictionary = {
  title?: string;
  subtitle?: string;
  readMore?: string;
  joinNow?: string;
  donateLabel?: string;
};

type HeroSectionProps = {
  dictionary?: HeroDictionary;
  locale: string;
};

export default function HeroSection({ dictionary, locale }: HeroSectionProps) {
  const title =
    dictionary?.title ?? "Rebuilding Haiti with dignity and hope";

  const subtitle =
    dictionary?.subtitle ??
    "A long-term, people-first movement uniting Haitians at home and abroad to restore communities, infrastructure, and opportunity.";

  const readMoreLabel = dictionary?.readMore ?? "Read the Vision";
  const joinNowLabel = dictionary?.joinNow ?? "Join the Movement";
  const donateLabel = dictionary?.donateLabel ?? "Donate";

  const stripeDonateUrl = process.env.NEXT_PUBLIC_STRIPE_DONATE_URL ?? "";
  const hasStripeDonate = stripeDonateUrl.trim().length > 0;

  return (
    <section className="relative w-full overflow-hidden text-white">

      {/* MAP */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[url('/images/haiti-map-bg-v2.png')]
          bg-no-repeat
          bg-cover
          bg-[position:50%_40%]
          opacity-100
          pointer-events-none
        "
      />

      {/* BLACK ➜ RED */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[linear-gradient(
            to_bottom,
            rgba(12,13,15,0.95)_0%,
            rgba(12,13,15,0.95)_50%,
            rgba(138,18,18,0.95)_100%
          )]
        "
      />

      {/* FOREGROUND */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-48 md:pt-56 pb-40 md:pb-48 min-h-[120vh] flex flex-col items-center justify-center text-center">

        <div className="space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/vision`}
            className="inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-3 text-sm sm:text-base font-semibold text-red-700 shadow-md hover:bg-white"
          >
            {readMoreLabel}
          </Link>

          <Link
            href={`/${locale}/join`}
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-red-700"
          >
            {joinNowLabel}
          </Link>

          {hasStripeDonate && (
            <a
              href={stripeDonateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm sm:text-base font-semibold text-rose-700 shadow-md hover:bg-white"
            >
              ❤️ <span>{donateLabel}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
