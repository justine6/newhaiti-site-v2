import Link from "next/link";

type HeroSectionProps = {
  dictionary?: {
    title?: string;
    subtitle?: string;
    readMore?: string;
    joinNow?: string;
  };
  locale: string;
};

export default function HeroSection({ dictionary, locale }: HeroSectionProps) {
  const title = dictionary?.title ?? "Haiti Team 2075";
  const subtitle =
    dictionary?.subtitle ?? "Restoring dignity. Rebuilding hope.";
  const readMoreLabel = dictionary?.readMore ?? "Read the Vision";
  const joinNowLabel = dictionary?.joinNow ?? "Join the Movement";

  return (
    <section
      className="
        relative overflow-hidden text-center
        flex items-center
        min-h-[640px] sm:min-h-[820px]   /* ⬆️ Taller hero */
      "
      style={{
        // 🌈 Gradient + map combined
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,43,127,0.55), rgba(210,16,52,0.75)), url('/images/haiti-map-bg.png')",
        backgroundSize: "cover",
        // ⬇️ Focus a bit lower so the island body + tail are in view
        backgroundPosition: "center 55%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 sm:py-28">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg sm:text-xl text-white drop-shadow">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/vision`}
            className="rounded-lg bg-white/90 px-6 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white"
          >
            {readMoreLabel}
          </Link>

          <Link
            href={`/${locale}/join`}
            className="rounded-lg bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-700"
          >
            {joinNowLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
