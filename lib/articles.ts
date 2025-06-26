import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const contentHtml = marked(content);

  return {
    title: data.title || 'Untitled',
    date: data.date || '',
    contentHtml,
  };
}
