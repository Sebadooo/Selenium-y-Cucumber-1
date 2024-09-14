FROM ghcr.io/architecture-it/react:node-20 AS builder
WORKDIR /app

COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --no-audit --silent --no-optional; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else \
    echo "ERROR: Falta archivo lockfile. Ver más en https://architecture-it.github.io/docs/Platform/Front/#manejo-de-dependencias"; \
    exit 1; \
  fi

RUN yarn build
    
FROM ghcr.io/architecture-it/nginx:latest

COPY --from=builder --chown=nginx:nginx /app/dist .

CMD ["/bin/sh", "-c", "react-env  -d ./ -- && nginx -g \"daemon off;\""]

