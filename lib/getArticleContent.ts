import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

type FrontMatter = {
  title: string;
  summary: string;
};

export async function getArticleContent(locale: string, slug: string) {
  const filePath = path.join(process.cwd(), 'public', 'articles', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Article not found: ${filePath}`);
  }

  const source = fs.readFileSync(filePath, 'utf8');

  const { content, frontmatter } = await compileMDX<FrontMatter>({
    source,
    options: { parseFrontmatter: true }
  });

  return {
    mdxSource: content,
    frontMatter: frontmatter
  };
}
