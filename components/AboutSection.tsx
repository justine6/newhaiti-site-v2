'use client';

type Props = {
  t: (key: string) => string;
};

export default function AboutSection({ t }: Props) {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">{t('aboutTitle')}</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('aboutDescription')}</p>
      <p className="mt-2 text-sm text-gray-400">{t('aboutCredit')}</p>
    </section>
  );
}
