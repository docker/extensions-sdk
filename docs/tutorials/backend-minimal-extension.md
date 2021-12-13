## Backend minimal extension

In this tutorial you will learn how to create the most minimal Desktop Extension which runs a backend service (container) in the Desktop VM.

## Prerequisites

- [Docker Desktop build with Extensions capabilities](https://github.com/docker/desktop-extension-samples/releases/)
- [Docker Extensions CLI](https://github.com/docker/desktop-extension-samples/releases/)

## Backend extension folder structure

A Desktop Extension is comprised of several files, ranging from the extension's source code to required Extension-specific files.

In the `hello-backend` folder, at the root of the repository, you can find a ready-to-go example. It represents a UI Extension built on HTML that runs a backend service. We will go through this code example in this tutorial.

```bash
.
├── Dockerfile # (1)
├── Makefile
├── client # (2)
│   └── src
│       ├── index.html
│       └── script.js
├── docker-compose.yaml # (3)
├── hello.sh # (4)
└── metadata.json # (5)
```

1. Contains everything required to build the extension and run it in Docker Desktop.
2. The source folder that contains all your HTML, CSS and JS files. These can also be other static assets like logos, icons, etc.
3. The `docker-compose.yaml` file to describe the container.
4. The script that will be run inside the container.
5. A file that provides information about the extension such as the name, description, and version, among others.

## The extension's Dockerfile

An extension requires a `Dockerfile` to build, publish and run in Docker Desktop.

The bare minimum configuration that a Dockerfile's extension requires to function properly is:

- Labels - required to provide extra information about the extension.
- The src code - in this case, an `index.html` that sits within the `ui` folder.
- The `metadata.json` file.
- The command to run to keep the container up and running indefinitely.

```Dockerfile title="Dockerfile" linenums="1"
FROM alpine:3.15

LABEL org.opencontainers.image.title="HelloBackend" \
    org.opencontainers.image.description="A sample extension that runs a shell script inside a container's Desktop VM." \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version="1.0.0-beta.1"

COPY hello.sh .
COPY docker-compose.yaml .
COPY metadata.json .
COPY client/src ./ui

CMD [ "sleep", "infinity" ]
```

## Configure the Extension metadata file

A `metadata.json` file is required at the root of the image filesystem.

```json title="metadata.json" linenums="1"
{
  "desktop-plugin-version": "1.0.0-beta.1",
  "name": "hello-backend",
  "provider": "Docker Inc.",
  "vm": {
    "composefile": "docker-compose.yaml"
  },
  "ui": {
    "dashboard-tab": {
      "title": "Hello Backend Extension",
      "root": "/ui",
      "src": "index.html"
    }
  }
}
```

### Validation

Next, validate the Extension metadata file against the JSON schema file.

```bash
docker extension validate metadata.json
```

If your extension is valid, you should see the following message:

`2021/12/13 18:17:35 The plugin metadata file is valid`.

## Build the extension

```bash
docker build -t desktop-hello-backend-extension:0.0.1 .
```

### Build the extension for multiple platforms

```bash
docker buildx build --platform=linux/amd64,linux/arm64 -t desktop-hello-backend-extension:0.0.1 .
```

## Install the extension

Now that the extension is packaged as a Docker image, let's proceed with the installation. To do so, we'll use the Docker Extensions CLI.

> Enable Docker Desktop Extensions
>
> Ensure the Extensions capabilities are enabled in the Docker Desktop build by running `docker extension enable`

To install the extension in Docker Desktop, run:

```bash
docker extension install desktop-hello-backend-extension:0.0.1
```

If the installation was successful, you should see the following output:

```bash
Installing new extension "hello-backend" with desktop-hello-backend-extension:0.0.1 ...
Installing service in Desktop VM...
Setting additional compose attributes
VM service started
Installing Desktop extension UI for tab "Hello Backend Extension"...
Extension UI tab "Hello Backend Extension" added.
Extension "hello-backend" installed successfully
```

## Preview the extension

You can verify that the extension has been installed successfully using the following CLI command:

```bash
docker extension ls
```

It outputs all the extensions installed:

```bash
PLUGIN              PROVIDER            IMAGE                           UI                      VM      HOST
hello-backend       Docker Inc.         desktop-hello-backend-extension:0.0.1   1 tab(Hello Backend Extension)   Running(1)          -
```

To preview the extension in Docker Desktop, close and open the Docker Desktop Dashboard once the installation has completed.

On the left-menu, you should see a new tab with the name `Hello Backend Extension`. Click on it to load the main window that will render content of the `index.html` page.

![Backend Hello Extension](images/backend-minimal-extension.png)

## Publish the extension

In order to publish the extension, we have to upload the Docker image to [DockerHub](https://hub.docker.com).

Let's tag the previous image to preprend the account owner at the beginning of the image name:

```bash
docker tag desktop-hello-backend-extension:0.0.1 owner/desktop-hello-backend-extension:0.0.1
```

```bash
docker push owner/desktop-hello-backend-extension:0.0.1
```

> Note that for Docker Extensions images to be listed in Docker Desktop, they must be approved by Docker and be tagged following semantic versioning, e.g: `0.0.1`.
>
> See [distribution and new releases](../DISTRIBUTION.md#distribution-and-new-releases) for more information.
>
> See <a href="https://semver.org/" target="__blank">semver.org</a> to learn more about semantic versioning.

> Having trouble to push the image?
>
> Ensure you are logged into DockerHub. Otherwise, run `docker login` to authenticate.

## Clean up

To remove the extension run:

```bash
docker extension rm hello-backend
```

The following output should be displayed:

```bash
Removing extension hello-backend...
Removing extension VM service...
Extension removed from Desktop VM
Extension UI tab Hello Backend Extension removed
Extension "hello-backend" removed
```
