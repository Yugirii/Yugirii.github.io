import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"` — Vercel runs Next.js natively with full
  // serverless support. Static export mode strips API routes entirely,
  // which is why /api/contact was returning 404 on Vercel.
  images: {
    // Let Vercel's built-in image optimisation run (remove unoptimized: true).
    // If you ever re-enable GitHub Pages, add this back.
  },
  env: {
    // basePath is empty on Vercel (deployed at root).
    // Keep the var in place so image src references still compile.
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;

