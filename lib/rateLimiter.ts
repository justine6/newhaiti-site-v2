// lib/rateLimiter.ts

type Tier = 'public' | 'member' | 'admin';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

// Configuration for each tier
const rateLimits: Record<Tier, RateLimitConfig> = {
  public: { windowMs: 60_000, maxRequests: 5 },         // 5 requests per 1 minute
  member: { windowMs: 300_000, maxRequests: 30 },       // 30 requests per 5 minutes
  admin: { windowMs: 600_000, maxRequests: 100 },       // 100 requests per 10 minutes
};

type Tracker = {
  count: number;
  expiresAt: number;
};

const trackerMap = new Map<string, Tracker>();

/**
 * Applies rate limiting based on client key (IP or token) and tier.
 * @param key Unique identifier (IP, token, etc.)
 * @param tier Tier of the user (public | member | admin)
 * @returns `true` if allowed, `false` if rate limit exceeded
 */
export function rateLimit(key: string, tier: Tier): boolean {
  const now = Date.now();
  const { windowMs, maxRequests } = rateLimits[tier];

  const existing = trackerMap.get(key);

  if (existing) {
    if (existing.expiresAt > now) {
      if (existing.count >= maxRequests) {
        return false;
      } else {
        existing.count += 1;
        trackerMap.set(key, existing);
        return true;
      }
    }
  }

  // First request or expired window
  trackerMap.set(key, { count: 1, expiresAt: now + windowMs });
  return true;
}
