/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ Use an object, not a boolean
  },
  // ✅ No i18n config needed here when using App Router
};

export default nextConfig;
