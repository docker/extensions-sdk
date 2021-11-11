FROM alpine AS tailscale
RUN apk add --no-cache curl
ARG TARGETARCH
ARG TSVERSION=1.14.3
RUN curl -fSsLo /tmp/tailscale.tgz https://pkgs.tailscale.com/stable/tailscale_${TSVERSION}_${TARGETARCH}.tgz \
    && mkdir /out \
    && tar -C /out -xzf /tmp/tailscale.tgz --strip-components=1

FROM node:14.17-alpine3.13 AS client-builder
WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
COPY client/.yarn /app/client/.yarn
COPY client/.yarnrc.yml /app/client/.yarnrc.yml
RUN --mount=type=cache,target=/app/client/.yarn/cache yarn
# install
COPY client /app/client
RUN --mount=type=cache,target=/app/client/.yarn/cache yarn build

FROM debian:bullseye-slim
LABEL org.opencontainers.image.title="Tailscale" \
    org.opencontainers.image.authors="Tailscale Inc." \
    com.docker.desktop.plugin.api.version="1.0.0-beta.1"
RUN apt-get update \
    && apt-get install -y \
        ca-certificates \
        iptables \
        iproute2 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=tailscale /out/tailscale /app/tailscale
COPY --from=tailscale /out/tailscaled /app/tailscaled
COPY vm/docker-compose.yaml .
COPY --from=client-builder /app/client/dist ui
COPY tailscale.svg .
COPY metadata.json .
CMD /app/tailscaled --state=tailscaled.state --tun=userspace-networking
