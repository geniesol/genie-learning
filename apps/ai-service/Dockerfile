FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
    RUN pnpm install --frozen-lockfile
    RUN pnpm install -g turbo
    RUN turbo run build --filter=ai-service

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/apps/ai-service/dist ./apps/ai-service/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/ai-service/node_modules ./apps/ai-service/node_modules
COPY --from=builder /app/apps/ai-service/package.json ./apps/ai-service/package.json

WORKDIR /app/apps/ai-service
EXPOSE 3002
CMD ["pnpm", "start:prod"]
