import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getArticleContent(locale: string, slug: string) {
  const filePath = path.join(process.cwd(), 'app/content/articles', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Article not found at path: ${filePath}`);
  }
  console.log("🔍 Attempting to read file from path:", filePath);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    metadata: data,
    content,
  };
}
