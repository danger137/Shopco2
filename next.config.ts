import { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || "",
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
