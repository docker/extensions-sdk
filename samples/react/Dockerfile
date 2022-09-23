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

FROM debian:bullseye-slim
LABEL org.opencontainers.image.title="React Docker Extension" \
    org.opencontainers.image.description="A sample extension that contains a ReactJS application." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.3.0" \
    com.docker.desktop.extension.icon="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" \
    com.docker.extension.screenshots='[{"alt":"hello world light mode", "url":"https://docker-extension-screenshots.s3.amazonaws.com/react/hello-world-light.png"}, {"alt":"hello world dark mode", "url":"https://docker-extension-screenshots.s3.amazonaws.com/react/hello-world-dark.png"}]' \
    com.docker.extension.detailed-description="<h1>Description</h1><p>This is a sample extension that contains a ReactJS application.</p>" \
    com.docker.extension.publisher-url="https://www.docker.com" \
    com.docker.extension.additional-urls='[{"title":"SDK Documentation","url":"https://docs.docker.com/desktop/extensions-sdk"}]' \
    com.docker.extension.changelog="<ul><li>Added metadata to provide more information about the extension.</li></ul>"

COPY --from=client-builder /app/client/dist ui
COPY docker.svg .
COPY metadata.json .
