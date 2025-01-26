
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
USER node

FROM base AS build
WORKDIR /usr/src/app
COPY --chown=node:node pnpm-lock.yaml package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --chown=node:node . .
RUN pnpm build

FROM base AS production
WORKDIR /usr/src/prod
COPY --from=build /usr/src/app/.env ./.env
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --ignore-scripts

CMD [ "node", "dist/src/main.js" ]