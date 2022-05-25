FROM golang:1.17-alpine AS builder
ENV CGO_ENABLED=0
WORKDIR /backend
COPY vm/go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download
COPY vm/. .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -trimpath -ldflags="-s -w" -o bin/service

FROM alpine

LABEL org.opencontainers.image.title="VM service" \
    org.opencontainers.image.description="A sample extension that uses a VM service to list all the Docker volumes." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.2.0" \
    com.docker.desktop.extension.icon="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" \
    com.docker.extension.screenshots='[{"alt":"volumes list light mode", "url":"https://docker-extension-screenshots.s3.amazonaws.com/vm-service/vm-service-light.png"}, {"alt":"volumes list dark mode", "url":"https://docker-extension-screenshots.s3.amazonaws.com/vm-service/vm-service-dark.png"}]' \
    com.docker.extension.detailed-description="<h1>Description</h1><p>This is a sample extension that uses a VM service to list all the Docker volumes.</p>" \
    com.docker.extension.publisher-url="https://www.docker.com" \
    com.docker.extension.additional-urls='[{"title":"SDK Documentation","url":"https://docs.docker.com/desktop/extensions-sdk"}]' \
    com.docker.extension.changelog="<ul><li>Added metadata to provide more information about the extension.</li></ul>"

COPY --from=builder /backend/bin/service /
COPY docker-compose.yaml .
COPY metadata.json .
COPY docker.svg .
COPY ui/src ./ui
CMD /service -socket /run/guest-services/extension-volumes.sock
