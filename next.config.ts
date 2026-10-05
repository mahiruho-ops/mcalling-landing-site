import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // geoip-lite reads .dat files from its own folder. Bundling it makes Node
  // look under .next instead, which is the ENOENT on /api/geo.
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
