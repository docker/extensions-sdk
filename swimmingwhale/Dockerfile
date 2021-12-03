FROM scratch

LABEL org.opencontainers.image.title="SwimmingWhale" \
    org.opencontainers.image.description="A sample plugin that just displays a whale swimming." \
    org.opencontainers.image.authors="Docker Inc." \
    com.docker.desktop.plugin.api.version="1.0.0-beta.1" \
    com.docker.desktop.plugin.icon="https://pbs.twimg.com/profile_images/1273307847103635465/lfVWBmiW_400x400.png"


COPY docker.svg .
COPY ui ./swim
COPY metadata.json .
