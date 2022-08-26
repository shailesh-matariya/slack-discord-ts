/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["slack-api.cloudcraftsmanship.io"],
  },
};

module.exports = nextConfig;
