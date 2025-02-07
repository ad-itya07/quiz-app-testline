import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/jsonserve/:path*',
        destination: 'https://api.jsonserve.com/Uw5CrX/:path*'
      }
    ];
  },
};

export default nextConfig;
