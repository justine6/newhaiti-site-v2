import "server-only";

function logWithTime(message: string, type: "log" | "warn" | "error" = "log") {
  const now = new Date().toISOString();
  if (type === "warn") {
    console.warn(`[${now}] ${message}`);
  } else if (type === "error") {
    console.error(`[${now}] ${message}`);
  } else {
    console.log(`[${now}] ${message}`);
  }
}

export async function fetchBlogFeed() {
  try {
    // ✅ corrected domain
    const res = await fetch("https://blogs.nouvoayiti2075.com/feed.json", {
      next: { revalidate: 60 }, // ISR: revalidate every 60s
    });

    if (!res.ok) {
      logWithTime(
        `❌ Failed to fetch feed.json: ${res.status} ${res.statusText}`,
        "error"
      );
      return [];
    }

    const posts = await res.json();

    // ✅ Count posts by locale
    const localeCounts: Record<string, number> = {};
    for (const post of posts) {
      const loc = post.locale || "unknown";
      localeCounts[loc] = (localeCounts[loc] || 0) + 1;
    }

    logWithTime(
      `✅ Fetched ${posts.length} posts. Locale breakdown: ${JSON.stringify(
        localeCounts
      )}`
    );

    // ✅ Supported locales
    const supportedLocales = ["en", "fr", "ht", "es"];

    for (const loc of supportedLocales) {
      if (!localeCounts[loc]) {
        if (loc === "en") {
          // ❌ English is mandatory — stop the build
          throw new Error(
            `[${new Date().toISOString()}] ❌ No posts found for locale "en". English fallback is mandatory.`
          );
        } else {
          // ⚠️ Non-English — warn only
          logWithTime(`⚠️ No posts found for locale "${loc}".`, "warn");
        }
      }
    }

    return posts;
  } catch (error) {
    logWithTime(`❌ Error fetching blog feed: ${error}`, "error");
    // ✅ safer fallback instead of crashing whole site
    return [];
  }
}
