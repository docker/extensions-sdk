FROM golang:1.17.3-bullseye as tailscale
WORKDIR /go/src/tailscale
COPY . ./
RUN git clone https://github.com/tailscale/tailscale.git && cd tailscale && \
    git checkout json && go mod download && \
    go install -mod=readonly ./cmd/tailscaled ./cmd/tailscale
COPY . ./

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
    org.opencontainers.image.authors="Tailscale Inc." \
    com.docker.desktop.plugin.api.version="1.0.0-beta.1"
RUN apt-get update \
    && apt-get install -y \
        ca-certificates \
        iptables \
        iproute2 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=tailscale /go/bin/tailscaled /app/tailscaled
COPY --from=tailscale /go/bin/tailscale /app/tailscale
COPY vm/docker-compose.yaml .
COPY --from=client-builder /app/client/dist ui
COPY tailscale.svg .
COPY metadata.json .
ENV TS_HOST_ENV dde
CMD /app/tailscaled --state=tailscaled.state --tun=userspace-networking
