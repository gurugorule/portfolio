/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-image-domain.com"], // Add any external image domains here
  },
  compress: true,
};

module.exports = nextConfig;
