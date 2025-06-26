// app/articles/page.tsx
import Link from 'next/link';

export default function ArticlesPage() {
  const articles = [
    {
      slug: 'vision-for-haiti-2075',
      title: 'Vision for Haiti 2075',
      summary: 'This is where the future of Haiti begins. Education, healthcare, unity...',
    },
  ];

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.slug}>
            <h2 className="text-xl font-semibold">
              <Link href={`/articles/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600">{article.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
