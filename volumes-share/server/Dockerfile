FROM golang:1.17-alpine AS builder
ENV CGO_ENABLED=0
RUN apk add --update make
WORKDIR /plugin
COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    make

FROM alpine
COPY --from=builder /plugin/volumes-share /
COPY docker-compose.yaml .
COPY metadata.json .

CMD cat /metadata.json
