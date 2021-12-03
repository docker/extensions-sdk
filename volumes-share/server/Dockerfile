FROM golang:1.17-alpine AS builder
ENV CGO_ENABLED=0
RUN apk add --update make
WORKDIR /plugin
COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    make

FROM alpine

LABEL org.opencontainers.image.title="volumes-share" \
    org.opencontainers.image.description="A sample plugin to push/pull volumes as images to DockerHub." \
    org.opencontainers.image.authors="Docker Inc." \
    com.docker.desktop.plugin.api.version="1.0.0-beta.1" \
    com.docker.desktop.plugin.icon="https://pbs.twimg.com/profile_images/1273307847103635465/lfVWBmiW_400x400.png"

COPY --from=builder /plugin/volumes-share /
COPY docker-compose.yaml .
COPY metadata.json .

CMD cat /metadata.json
