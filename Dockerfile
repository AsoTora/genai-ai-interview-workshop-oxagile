FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm build

FROM base AS production
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["pnpm", "start"]
