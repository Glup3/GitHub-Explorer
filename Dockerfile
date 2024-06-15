FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build


FROM node:20-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist /app
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]

