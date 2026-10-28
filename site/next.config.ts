import type { NextConfig } from "next";

// Static export: the build in out/ runs on any static host (HostGator/Apache, S3, Amplify).
const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves the project under /olpex-web; the workflow sets this. Empty for olpex.net.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
