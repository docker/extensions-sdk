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
ARG TARGETARCH
RUN yarn config set cache-folder /usr/local/share/.cache/yarn-${TARGETARCH}
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn
# install
COPY client /app/client
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn build

FROM debian:bullseye-slim
LABEL org.opencontainers.image.title="Tailscale" \
    org.opencontainers.image.description="Expose your Docker containers to a secure VPN in one click." \
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
COPY --from=client-builder /app/client/dist ui
COPY tailscale.svg .
COPY metadata.json .
COPY host/hostname darwin/hostname
COPY host/hostname.cmd windows/hostname.cmd
ENV TS_HOST_ENV dde
CMD /app/tailscaled --state=tailscaled.state --tun=userspace-networking
