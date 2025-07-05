'use client';

type HeroProps = {
  dictionary: {
    title: string;
    subtitle: string;
  };
};

export default function HeroSection({ dictionary }: HeroProps) {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold">{dictionary.title}</h1>
      <p className="text-xl mt-4">{dictionary.subtitle}</p>
    </section>
  );
}
