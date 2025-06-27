import { getArticleContent } from '@/lib/getArticleContent';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function ArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { mdxSource, frontMatter } = await getArticleContent(params.locale, params.slug);

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{frontMatter.title}</h1>
      <p className="text-gray-600 mb-8">{frontMatter.summary}</p>
      <article className="prose prose-lg">
        <MDXRemote source={mdxSource} />
      </article>
    </main>
  );
}
