FROM node:17.7-alpine3.14 AS client-builder
WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
ARG TARGETARCH
RUN yarn config set cache-folder /usr/local/share/.cache/yarn-${TARGETARCH}
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn
# install
COPY client /app/client
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn build

FROM debian:bullseye-slim
LABEL org.opencontainers.image.title="ui-extension" \
    org.opencontainers.image.description="Your Desktop Extension Description" \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.2.0" \
    com.docker.desktop.extension.icon="https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png"

COPY --from=client-builder /app/client/dist ui
COPY docker.svg .
COPY metadata.json .
