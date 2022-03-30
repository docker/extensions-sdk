## Introduction

As an extension author, you must ensure the extension is supported for the following architectures:

- `linux/amd64`
- `linux/arm64`

Docker Desktop will retrieve the extension image according to the user's system architecture. If the extension does not provide an image that matches the user's system architecture, Docker Desktop won't be able to install the extension. As a result, users won't be able to run the extension in Docker Desktop.

## Building and pushing for multiple architectures

If you created an extension from the `docker extension init` command, there's a `Makefile` at the root of the directory that includes a target with name `push-extension`.

You can do `make push-extension` to build your extension against both `linux/amd64` and `linux/arm64` platforms, and push them to DockerHub.

On the other hand, in case you do not want to use the provided `Makefile`, you can use the following command to build your extension for multiple architectures:

```cli
docker buildx build \
    --push \
    --platform=linux/amd64,linux/arm64 \
    --tag=my-extension:0.0.1 .
```

The paragraphs above just serve as a guide to help you get started. In fact, it's up to the extension's author to define the CI/CD process to build and push the extension.

![hub-multi-arch-extension](./images/hub-multi-arch-extension.png)

## Adding multi-arch binaries

If your extension includes some binaries that will be deployed to the host, it's important that they also have the right architecture when building the extension against multiple architectures.

At the moment, we do not provide a way to explicitly specify multiple binaries for every architecture in the `metadata.json` file. However, you still can add architecture-specific binaries depending on the `TARGETARCH` in the extension's `Dockerfile`.

Let's demonstrate it through the example below. We have developed an extension that uses a binary as part of its operations. We want such extension to run both in Docker Desktop for Mac and Windows.

In the `Dockerfile`, we download the binary depending on the target architecture:

```Dockerfile title="Dockerfile" linenums="1" hl_lines="8-9 14-15"
#syntax=docker/dockerfile:1.3-labs

FROM alpine AS dl
WORKDIR /tmp
RUN apk add --no-cache curl tar
ARG TARGETARCH
RUN <<EOT ash
    mkdir -p /out/darwin
    curl -fSsLo /out/darwin/kubectl "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/darwin/${TARGETARCH}/kubectl"
    chmod a+x /out/darwin/kubectl
EOT
RUN <<EOT ash
    if [ "amd64" = "$TARGETARCH" ]; then
        mkdir -p /out/windows
        curl -fSsLo /out/windows/kubectl.exe "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/windows/amd64/kubectl.exe"
    fi
EOT

FROM alpine
LABEL org.opencontainers.image.title="example-extension" \
    org.opencontainers.image.description="My Example Extension" \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version=">= 0.1.0"

COPY --from=dl /out /
```

In the `metadata.json` file, we especify the path for every binary on every platform:

```json title="metadata.json" linenums="1" hl_lines="12-25"
{
  "name": "example-extension",
  "provider": "Docker Inc.",
  "icon": "docker.svg",
  "ui": {
    "dashboard-tab": {
      "title": "Example Extension",
      "src": "index.html",
      "root": "ui"
    }
  },
  "host": {
    "binaries": [
      {
        "darwin": [
          {
            "path": "/darwin/kubectl"
          }
        ],
        "windows": [
          {
            "path": "/windows/kubectl.exe"
          }
        ]
      }
    ]
  }
}
```

Therefore:

- When building the extension for `TARGETARCH` equals to `arm64`, the `kubectl` binary fetched will correspond to the `arm64` architecture, and will be copied at `/darwin/kubectl` in the final stage.

- When building the extension for `TARGETARCH` equals to `amd64`, two `kubectl` binaries will be fetched (one for Darwin and another for Windows). They will be copied to `/darwin/kubectl` and `/windows/kubectl.exe` in the final stage, respectively.

!!! info

    Note that the binary destination path for `darwin` is the same in both cases, i.e. `darwin/kubectl`. The only thing that changes is the architecutre-specific binary downloaded.

Finally, when the extension is installed, the extension framework will copy the binaries from the extension image at `/darwin/kubectl` (in the case of Darwin) or `/windows/kubectl.exe` (in the case of Windows) to a especific location in the user's host filesystem.

## FAQs

- Can I develop extensions that run Windows containers?

Although Docker Extensions is supported on Docker Desktop for Windows, Mac and Linux, the extension framework only supports linux containers at the time of this writing. Therefore, you must target `linux` as the OS when building your extension image.
