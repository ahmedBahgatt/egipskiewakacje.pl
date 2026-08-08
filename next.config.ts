import type { NextConfig } from "next";

/**
 * Static-export configuration for GitHub Pages hosting.
 *
 * The public site is fully static: no server routes, no Server Actions,
 * no runtime image optimizer. This keeps the project hosting-independent
 * (GitHub Pages today, Vercel/Cloudflare/Railway later) without changing
 * the URL structure or the frontend.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // GitHub Pages cannot run the Next image optimizer; assets are
    // pre-optimized at build time (see scripts/generate-media.mjs).
    unoptimized: true,
  },
  // Fail the build on type or lint errors instead of shipping broken output.
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
