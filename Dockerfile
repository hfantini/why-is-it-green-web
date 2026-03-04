# -----------------------------
# Stage 1 — Build
# -----------------------------

FROM node:22-alpine AS builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG BUILD_NUMBER=1
ARG GIT_SHA=?
ARG ENVIRONMENT=prod

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV GIT_SHA=$GIT_SHA

RUN pnpm run build:${ENVIRONMENT}

# -----------------------------
# Stage 2 — Runtime
# -----------------------------

FROM nginx:1.26-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]