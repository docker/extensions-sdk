FROM --platform=$BUILDPLATFORM node:18.9-alpine3.15 AS client-builder
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

FROM scratch

LABEL org.opencontainers.image.title="Minimal Docker CLI" \
    org.opencontainers.image.description="A sample extension to show how to run docker commands from an extension." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.3.0" \
    com.docker.desktop.extension.icon="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" \
    com.docker.extension.screenshots='[{"alt":"docker info", "url":"https://docker-extension-screenshots.s3.amazonaws.com/minimal-docker-cli/1-get-docker-info.png"}]' \
    com.docker.extension.detailed-description="<h1>Description</h1><p>This is a sample extension that uses the <code>docker info</code> command to display the number of allocated CPUs and allocated memory by the Docker Desktop VM.</p>" \
    com.docker.extension.publisher-url="https://www.docker.com" \
    com.docker.extension.additional-urls='[{"title":"SDK Documentation","url":"https://docs.docker.com/desktop/extensions-sdk"}]' \
    com.docker.extension.changelog="<ul><li>Added metadata to provide more information about the extension.</li></ul>"

COPY --from=client-builder /app/client/dist ui
COPY metadata.json .
