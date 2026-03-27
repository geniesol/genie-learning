FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@latest
EXPOSE 3000

FROM base AS builder
WORKDIR /app
COPY . .
    RUN pnpm install --frozen-lockfile
    RUN pnpm install -g turbo
    RUN turbo run build --filter=ai-service

FROM base AS runner
WORKDIR /app
COPY --from=builder /app .
COPY --from=builder /app/packages/db ./packages/db

WORKDIR /app/apps/ai-service
EXPOSE 3000
CMD ["node", "dist/main.js"]
