// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
