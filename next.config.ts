import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle so the Docker image only needs
  // the standalone folder + public + .next/static — no node_modules in prod.
  // Required for Cloud Run / any container runner.
  output: "standalone",
  // Pin the workspace root so Next doesn't auto-detect a parent directory
  // (which on this dev machine has its own lockfile and confuses both
  // the standalone tracer AND Turbopack).
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: {
    root: path.resolve(__dirname),
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
