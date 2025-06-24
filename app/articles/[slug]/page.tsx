import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: Props) {
  const { slug } = params;

  // TODO: Load article content by slug (from file, CMS, or static array)
  const article = {
    title: 'Vision for Haiti 2075',
    content: 'This is where the future of Haiti begins. Education, healthcare, unity...'
  };

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-lg leading-relaxed">{article.content}</p>
    </div>
  );
}
