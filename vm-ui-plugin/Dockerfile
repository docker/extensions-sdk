FROM golang:1.17-alpine AS builder
ENV CGO_ENABLED=0
RUN apk add --update make
WORKDIR /plugin
COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    make bin

FROM alpine
COPY --from=builder /plugin/bin/volume-service /
COPY vm-main/docker-compose.yaml .
COPY metadata.json .
COPY client/src ./plugin-ui

CMD cat /metadata.json
