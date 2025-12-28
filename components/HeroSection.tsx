import Link from "next/link";
import Image from "next/image";

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
    <section className="relative overflow-hidden">
      {/* 🔵🔴 Haiti flag + map background */}
      <div className="absolute inset-0 -z-10">
        {/* Flag gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002b7f] to-[#d21034]" />

        {/* Map image overlay */}
        <Image
          src="/images/haiti-map-bg.png"
          alt="Map of Haiti over the national flag"
          fill
          priority
          className="object-contain object-center opacity-90 mix-blend-normal pointer-events-none select-none"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:py-36">
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
      </div>
    </section>
  );
}
