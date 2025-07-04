'use client';

type AboutSectionProps = {
  dictionary: {
    title: string;
    description: string;
  };
};

export default function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section className="bg-gray-100 py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">{dictionary.title || 'About Us'}</h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
        {dictionary.description || 'We are a collective of builders, dreamers, and change-makers.'}
      </p>
    </section>
  );
}
