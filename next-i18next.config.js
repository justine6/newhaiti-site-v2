/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Removed unsupported i18n config for App Router
};

export default nextConfig;
