# ---------- Dependencies ----------
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

# ---------- Builder ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- Runner ----------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install Doppler via official script (automatically installs Alpine-native build)
RUN apk add --no-cache curl && \
    (curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://doppler.com | sh) && \
    apk del curl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["doppler", "run", "--", "node", "server.js"]