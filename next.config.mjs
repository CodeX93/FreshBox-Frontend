// next.config.js
import { withNetlify } from '@netlify/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default withNetlify(nextConfig);
