import Link from "next/link";
import Image from "next/image";
import { fetchBlogFeed } from "@/lib/fetchBlogFeed";
import type { HomeDictionary } from "@/lib/i18n/types";

type BlogSectionProps = {
  locale?: string;
  dictionary: HomeDictionary;
};

// Same external base; server-side is fine to read env
const BLOG_APP_BASE_URL =
  process.env.NEXT_PUBLIC_BLOG_APP_BASE_URL ??
  "https://nouvo-ayiti-2075-blogs-uzds-5hiallswr-jutellane.vercel.app";

function getBlogUrl(locale: string, path: string) {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${BLOG_APP_BASE_URL}/${locale}${trimmed}`;
}

export default async function BlogSection({
  locale,
  dictionary,
}: BlogSectionProps) {
  const safeLocale = locale && locale.trim() !== "" ? locale : "en";

  let posts: any[] = [];
  let fetchError: string | null = null;

  try {
    posts = await fetchBlogFeed();
  } catch (error: any) {
    console.error("❌ Blog feed fetch failed:", error);
    fetchError =
      dictionary.blogSection?.blogUnavailable ||
      "We couldn’t load blog posts at the moment. Please try again later.";
  }

  if (fetchError) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ⚠️ {dictionary.blogSection?.title || "Blog Unavailable"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{fetchError}</p>
        </div>
      </section>
    );
  }

  // Filter posts by locale
  const localizedPosts = posts.filter((post) => post.locale === safeLocale);

  const isFallback = localizedPosts.length === 0 && posts.length > 0;
  const displayedPosts = isFallback
    ? posts.filter((post) => post.locale === "en")
    : localizedPosts;

  const latestPosts = displayedPosts.slice(0, 3);

  const blogDict = dictionary.blogSection;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {blogDict?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {blogDict?.paragraph}
            </p>
          </div>
          <Link
            href={getBlogUrl(safeLocale, "/blog")}
            prefetch={false}
            target="_blank"
            rel="noreferrer"
            className="mt-4 md:mt-0 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            {blogDict?.cta}
          </Link>
        </div>

        {/* Fallback notice if using English posts */}
        {isFallback && (
          <p className="text-center text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-md mb-6">
            {blogDict?.fallbackNotice}
          </p>
        )}

        {/* No posts available */}
        {latestPosts.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            {blogDict?.blogUnavailable}
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt || blogDict?.blogUnavailable}
                </p>
                <Link
                  href={getBlogUrl(safeLocale, `/blog/${post.slug}`)}
                  prefetch={false}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {blogDict?.readMore}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
