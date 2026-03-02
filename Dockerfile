FROM node:20-slim AS deps
WORKDIR /app

# Install dependencies using lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci --include=optional

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
