// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com','localhost','images.unsplash.com','images.pexels.com','videos.pexels.com'],
  },
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
