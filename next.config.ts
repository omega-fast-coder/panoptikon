import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.pixabay.com",
      },
      { hostname: "berlingske.bmcdn.dk" },
      { hostname: "www.tvmidtvest.dk" },
      { hostname: "k9-drupal-images.k.dk" },
    ],
  },
};

export default nextConfig;
