import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/settings';

type Props = {
  params: { locale: Locale };
};

export default async function BlogPage({ params: { locale } }: Props) {
  const blog = await getDictionary(locale, 'blog');

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.heading}</h1>
      <p className="text-lg text-muted-foreground mb-8">{blog.intro}</p>

      <div className="border rounded-lg p-6 shadow-md bg-white dark:bg-zinc-900">
        <h2 className="text-xl font-semibold">{blog.featured}</h2>
        <p className="mt-2 text-muted-foreground">{blog.noPosts}</p>
      </div>
    </main>
  );
}
