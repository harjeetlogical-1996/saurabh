# syntax=docker/dockerfile:1.7

# ─── deps ─────────────────────────────────────────────────────────────────
# Install full deps so the build stage can compile + tree-shake. Sharp
# bundles its own libvips on linux/amd64 wheel, no extra apt packages
# needed.
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# ─── build ────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# next.config.ts has output: "standalone", so this writes a tiny
# .next/standalone folder containing only what production needs.
RUN npm run build

# ─── runner ──────────────────────────────────────────────────────────────
# Minimal final image: standalone server + static assets + public dir.
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run injects PORT (default 8080). Next's standalone server reads it.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Run as a non-root user.
RUN groupadd --system --gid 1001 nodejs \
 && useradd  --system --uid 1001 --gid nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
