import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // remote images
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
