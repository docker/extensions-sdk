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
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version="1.0.0-beta.1"

COPY --from=builder /plugin/volumes-share /
COPY docker-compose.yaml .
COPY metadata.json .

CMD cat /metadata.json
