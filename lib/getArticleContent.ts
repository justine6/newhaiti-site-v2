import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export async function getArticleContent(locale: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'articles', locale, `${slug}.mdx`);
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(rawContent);
  const mdxSource = await serialize(content);

  return {
    frontMatter: data,
    mdxSource,
  };
}
