FROM --platform=$BUILDPLATFORM node:18.3.0-alpine3.16 AS client-builder

WORKDIR /ui

# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci

# install
COPY ui /ui
RUN npm run build

FROM alpine
LABEL org.opencontainers.image.title="Kubernetes Sample" \
    org.opencontainers.image.description="This is a sample Docker Extension that shows how to interact with a Kubernetes cluster by shipping the kubectl command line too to read the kubeconfig file from your host filesystem." \
    org.opencontainers.image.vendor="Docker" \
    org.opencontainers.image.licenses="Apache-2.0" \
    com.docker.desktop.extension.icon="" \
    com.docker.desktop.extension.api.version=">= 0.2.3" \
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""

RUN apk add curl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl \
    && mkdir /linux \
    && cp /usr/local/bin/kubectl /linux/

RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl" \
    && mkdir /darwin \
    && chmod +x ./kubectl && mv ./kubectl /darwin/

RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/windows/amd64/kubectl.exe" \
    && mkdir /windows \
    && chmod +x ./kubectl.exe && mv ./kubectl.exe /windows/

COPY metadata.json .
COPY docker.svg .
COPY --from=client-builder /ui/build ui
