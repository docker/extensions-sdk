FROM golang:1.17-alpine AS builder
ENV CGO_ENABLED=0
RUN apk add --update make
WORKDIR /plugin
COPY . .
RUN make bin

FROM alpine
COPY --from=builder /plugin/bin/volume-service /
COPY vm-main/docker-compose.yaml .
COPY metadata.json .
COPY client/src ./plugin-ui

CMD /volume-service -socket /run/guest-services/plugin-volumes.sock
