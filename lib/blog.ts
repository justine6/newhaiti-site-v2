// lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

const articlesDir = path.join(process.cwd(), "content/articles");

export function getLatestPosts(limit = 3): BlogPost[] {
  const files = fs.readdirSync(articlesDir);

  const posts = files.map((file) => {
    const filePath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug: file.replace(/\.mdx?$/, ""),
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      date: data.date || "",
    };
  });

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
