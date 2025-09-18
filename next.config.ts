import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.staradvertiser.com",  // ✅ add this line
    ],
  },
};

export default nextConfig;
