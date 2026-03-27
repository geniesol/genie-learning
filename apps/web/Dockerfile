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

# Copy the standalone server bundle (includes only required node_modules)
COPY --from=builder /app/apps/web/.next/standalone ./
# Copy static assets (not included in standalone bundle)
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
