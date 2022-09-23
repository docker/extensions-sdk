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

FROM alpine:3.15

LABEL org.opencontainers.image.title="HelloBackend" \
    org.opencontainers.image.description="A sample extension that runs a shell script inside a container's Desktop VM." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.3.0" \
    com.docker.desktop.extension.icon="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" \
    com.docker.extension.screenshots='[{"alt":"Hello, Moby", "url":"https://docker-extension-screenshots.s3.amazonaws.com/minimal-backend/1-hello-moby.png"}]' \
    com.docker.extension.detailed-description="<h1>Description</h1><p>This is a sample extension that displays the text introduced in a textbox.</p>" \
    com.docker.extension.publisher-url="https://www.docker.com" \
    com.docker.extension.additional-urls='[{"title":"SDK Documentation","url":"https://docs.docker.com/desktop/extensions-sdk"}]' \
    com.docker.extension.changelog="<ul><li>Added metadata to provide more information about the extension.</li></ul>"

COPY hello.sh .
COPY metadata.json .
COPY --from=client-builder /app/client/dist ui

CMD [ "sleep", "infinity" ]
