import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      process.env.R2_DEV_URL_CONFIG as string
    ]
  }
};

export default nextConfig;
