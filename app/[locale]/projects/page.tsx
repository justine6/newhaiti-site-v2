// app/[locale]/projects/page.tsx
import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';
import type { ProjectsDictionary } from '@/lib/i18n/types';

import {
  Globe,
  BookOpen,
  Building,
  Heart,
  Home,
  Leaf,
  Wheat,
  Landmark,
  Palette,
  Cpu,
  BadgeCheck,
} from 'lucide-react';

type Props = {
  params: { locale: Locale };
};

const categoryIcons: Record<string, JSX.Element> = {
  sanitation: <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  education: <BookOpen className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
  infrastructure: <Building className="w-8 h-8 text-gray-600 dark:text-gray-400" />,
  healthcare: <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />,
  housing: <Home className="w-8 h-8 text-green-600 dark:text-green-400" />,
  agriculture: <Wheat className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
  environment: <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
  commerce: <Landmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
  arts: <Palette className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
  technology: <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
  governance: <BadgeCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
};

export default async function ProjectsPage({ params: { locale } }: Props) {
  const projects = (await getDictionary(locale, 'projects')) as ProjectsDictionary | null;

  if (!projects) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Projects unavailable</h1>
        <p>Please check your locale or the translation file for “projects”.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left">{projects.heading}</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center md:text-left">
        {projects.intro}
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(projects.categories).map(([key, value]) => (
          <div
            key={key}
            className="p-6 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {categoryIcons[key] || <Globe className="w-8 h-8 text-gray-400" />}
            </div>
            <h3 className="text-lg font-semibold text-center">{value}</h3>
          </div>
        ))}
      </section>

      <p className="mt-10 text-center text-xl font-medium text-primary">
        {projects.callToAction}
      </p>
    </main>
  );
}
