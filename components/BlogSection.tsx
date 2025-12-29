"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type BlogPost = {
  id?: string;
  slug?: string;
  url?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  locale?: string;
};

type BlogSectionDictionary = {
  title?: string;
  subtitle?: string;
  viewAll?: string;
  blogUnavailable?: string;
  readMore?: string;
};

type BlogSectionProps = {
  locale: string;
  dictionary?: { blogSection?: BlogSectionDictionary };
  posts: BlogPost[];
};

// Container + card animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function BlogSection(props: BlogSectionProps) {
  const { locale, dictionary, posts: rawPosts } = props;

  const dict = dictionary?.blogSection ?? {};

  const title = dict.title ?? "From Our Blog";
  const subtitle =
    dict.subtitle ??
    "Explore stories, updates, and reflections from the Nouvo Ayiti 2075 movement.";
  const viewAllLabel = dict.viewAll ?? "Visit Our Blog";
  const readMoreLabel = dict.readMore ?? "Read more";
  const blogUnavailable =
    dict.blogUnavailable ?? "Blog posts will appear here soon. Stay tuned.";

  // ✅ Ensure we always have an array
  const posts: BlogPost[] = Array.isArray(rawPosts) ? rawPosts : [];

  // Main blog site URL (already live)
  const blogHomeUrl = `https://blogs.nouvoayiti2075.com/${locale}`;

  return (
    <section id="blog" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading row */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-600">{subtitle}</p>
          </div>

          <div className="text-center sm:text-right">
            <Link
              href={blogHomeUrl}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>

        {/* ✨ Animated posts grid */}
        {posts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            {posts.map((post, index) => {
              const href =
                post.url ??
                (post.slug
                  ? `https://blogs.nouvoayiti2075.com/${locale}/${post.slug}`
                  : blogHomeUrl);

              return (
                <motion.article
                  key={post.id ?? post.slug ?? index}
                  variants={cardVariants}
                  className="rounded-xl bg-slate-50 border border-slate-100 p-5 flex flex-col gap-3
                             hover:bg-white hover:shadow-lg hover:-translate-y-1
                             transition-transform transition-shadow duration-200"
                >
                  <div className="space-y-1">
                    {post.date && (
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        {post.date}
                      </p>
                    )}
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {post.title ?? "Blog post"}
                    </h3>
                  </div>

                  {post.excerpt && (
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-auto pt-2">
                    <Link
                      href={href}
                      className="inline-flex items-center text-xs font-semibold text-red-600 hover:text-red-700"
                    >
                      {readMoreLabel}
                      <span aria-hidden="true" className="ml-1">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <p className="text-center text-sm text-slate-500">{blogUnavailable}</p>
        )}
      </div>
    </section>
  );
}

