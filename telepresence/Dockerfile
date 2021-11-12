#syntax=docker/dockerfile:1.3-labs

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

FROM alpine AS dl
WORKDIR /tmp
RUN apk add --no-cache curl tar
ARG TARGETARCH
RUN <<EOT ash
    mkdir -p /out/darwin
    curl -fSsLo /out/darwin/telepresence      https://app.getambassador.io/download/tel2/darwin/${TARGETARCH}/latest/telepresence
    chmod a+x /out/darwin/telepresence
    curl -fSsLo /out/darwin/kubectl          "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/darwin/${TARGETARCH}/kubectl"
    chmod a+x /out/darwin/kubectl
EOT
RUN <<EOT ash
    if [ "amd64" = "$TARGETARCH" ]; then
        mkdir -p /out/windows
        curl -fSsLo /out/windows/telepresence.zip https://app.getambassador.io/download/tel2/windows/amd64/latest/telepresence.zip
        curl -fSsLo /out/windows/kubectl.exe     "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/windows/amd64/kubectl.exe"
    fi
EOT

FROM scratch
LABEL org.opencontainers.image.title="Telepresence" \
    org.opencontainers.image.authors="Datawire" \
    com.docker.desktop.plugin.api.version="1.0.0-beta.1"

COPY --from=client-builder /app/client/dist ui
COPY --from=dl /out /

COPY telepresence-win-install.ps1 /windows
COPY metadata.json .
