import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import type { ProjectsDictionary } from '@/lib/i18n/types';

type Props = {
  params: { locale: Locale };
};

export default async function ProjectsPage({ params: { locale } }: Awaited<Props>) {
  const projects = (await getDictionary(locale, 'projects')) as ProjectsDictionary | null;

  if (!projects) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Projects unavailable</h1>
        <p>Please check your locale or the translation file for "projects".</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{projects.heading}</h1>
      <p className="text-lg text-muted-foreground mb-8">{projects.intro}</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(projects.categories).map(([key, value]) => (
          <div
            key={key}
            className="p-4 border border-gray-300 dark:border-zinc-700 rounded-lg"
          >
            <h3 className="text-xl font-semibold">{value}</h3>
          </div>
        ))}
      </section>

      <p className="mt-8 text-center text-xl font-medium">{projects.callToAction}</p>
    </main>
  );
}
