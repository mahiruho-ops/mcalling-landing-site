import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // geoip-lite reads binary .dat files from disk via __dirname; must not be bundled.
  serverExternalPackages: ["geoip-lite"],
  async redirects() {
    return [
      {
        source: "/pricing-old",
        destination: "/pricing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
