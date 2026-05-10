# Stage 1: Build React
FROM node:20-alpine AS builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --frozen-lockfile
COPY client/ .
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --frozen-lockfile --omit=dev

COPY server/index.js ./server/
COPY --from=builder /app/client/dist ./client/dist

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 5000
ENV NODE_ENV=production PORT=5000

CMD ["node", "server/index.js"]
