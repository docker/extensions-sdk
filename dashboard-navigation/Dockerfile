FROM alpine:3.15

LABEL org.opencontainers.image.title="DashboardNavigation" \
    org.opencontainers.image.description="A sample extension that navigates to a specified Dashboard route." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version="1.0.0-beta.1"

COPY metadata.json .
COPY client/src ./ui

CMD [ "sleep", "infinity" ]
