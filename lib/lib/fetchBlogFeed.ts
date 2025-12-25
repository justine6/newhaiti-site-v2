// lib/fetchBlogFeed.ts
export async function fetchBlogFeed() {
  try {
    const res = await fetch("https://blog.nouvoayiti2075.com/feed.json", {
      next: { revalidate: 60 }, // cache & revalidate every 60s
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch blog feed:", e);
    return [];
  }
}
