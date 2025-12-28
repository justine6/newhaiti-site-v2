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
    dictionary?.subtitle ?? "Restoring Dignity. Rebuilding Hope.";
  const readMoreLabel = dictionary?.readMore ?? "Read the Vision";
  const joinNowLabel = dictionary?.joinNow ?? "Join the Movement";

  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-b from-blue-900 via-purple-800 to-red-700
        text-center
      "
    >
      {/* 🔵🔴 Map background, edge to edge */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[url('/images/haiti-map-bg.png')]
          bg-cover bg-center bg-no-repeat
        "
      />

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 -z-10 bg-black/25" />

      {/* Content */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 sm:py-40">
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
