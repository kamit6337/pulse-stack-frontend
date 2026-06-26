# =========================
# Dependencies
# =========================
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

# =========================
# Builder
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# =========================
# Runner
# =========================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install Doppler CLI
RUN wget -q -t3 \
'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' \
-O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub \
 && echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' \
 >> /etc/apk/repositories \
 && apk add --no-cache doppler

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./


# Running as a non-root user is a common production security practice and is a good fit for a public-facing Next.js application.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

EXPOSE 3000

CMD ["doppler","run","--","node","server.js"]