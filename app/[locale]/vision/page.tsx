import { getDictionary } from '../../../lib/getDictionary';
import { Locale } from '../../../i18n-config';


type Props = {
  params: { locale: Locale };
};

export default async function VisionPage({ params: { locale } }: Props) {
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen py-20 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {dictionary.hero.readVision}
      </h1>
      <p className="text-lg">
        Coming soon: The full vision of Nouvo Ayiti 2075.
      </p>
    </main>
  );
}
