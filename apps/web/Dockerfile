FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@latest

FROM base AS builder
WORKDIR /app
COPY . .
    RUN pnpm install --frozen-lockfile
    RUN pnpm install -g turbo
    RUN turbo run build --filter=web

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

WORKDIR /app/apps/web
EXPOSE 3000
# Disable Corepack to prevent DNS issues during startup discoverability
ENV COREPACK_ENABLE_STRICT=0
CMD ["npx", "next", "start"]
