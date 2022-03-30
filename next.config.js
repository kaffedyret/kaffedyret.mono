/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SANITY_DATASET: process.env.SANITY_DATASET,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
