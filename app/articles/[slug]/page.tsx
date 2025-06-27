import { MDXRemote } from 'next-mdx-remote';
import getArticleContent from '@/lib/getArticleContent';

export default async function ArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  try {
    const { mdxSource, frontMatter } = await getArticleContent(
      params.locale,
      params.slug
    );

    return (
      <main className="p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{frontMatter.title}</h1>
        <p className="text-gray-600 mb-8">{frontMatter.summary}</p>
        <article className="prose prose-lg">
          <MDXRemote source={mdxSource} />
        </article>
      </main>
    );
  } catch (error) {
    console.error('[ArticlePage] Failed to load article:', error);
    return (
      <main className="p-10 max-w-3xl mx-auto">
        <h1 className="text-red-600 text-xl font-bold">Failed to load article</h1>
        <p>There was an error fetching this content. Please try again later.</p>
      </main>
    );
  }
}
