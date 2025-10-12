/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com", "blob.core.windows.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
