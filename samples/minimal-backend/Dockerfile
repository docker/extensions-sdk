FROM alpine:3.15

LABEL org.opencontainers.image.title="HelloBackend" \
    org.opencontainers.image.description="A sample extension that runs a shell script inside a container's Desktop VM." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.2.0"

COPY hello.sh .
COPY metadata.json .
COPY client/src ./ui

CMD [ "sleep", "infinity" ]
