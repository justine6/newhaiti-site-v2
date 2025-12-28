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
  const title =
    dictionary?.title ?? "Haiti Team 2075";
  const subtitle =
    dictionary?.subtitle ?? "Restoring Dignity. Rebuilding Hope.";
  const readMoreLabel =
    dictionary?.readMore ?? "Read the Vision";
  const joinNowLabel =
    dictionary?.joinNow ?? "Join the Movement";

  return (
    <section className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:py-36">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-lg">
        {title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-white sm:text-xl drop-shadow">
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
    </section>
  );
}
