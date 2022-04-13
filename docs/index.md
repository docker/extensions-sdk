# Docker Extension SDK

This repository includes all resources to create your own Docker Extensions.

!!! warning

    This work is experimental and still in progress, features and APIs detailed are subject to change.

## Overview

Extensions are packaged as specially formatted Docker images (our CLI tool helps to build these). The most fundamental requirement is a `metadata.json` file at the root of the image filesystem, describing the content of the extension.

An extension can contain a UI part and backend parts (running either on the host or in the Desktop virtual machine).

Details are described in [Extension structure](extensions/METADATA.md).

Extension distribution will be done through the Docker Hub.
Development of extensions can be done locally without the need to push the extension to Docker Hub.
This is described in [Extension Distribution](extensions/DISTRIBUTION.md).

## Prerequisites

To get started with Docker Extensions you will need a specific Docker Desktop build that comes with extension capabilities.

Go to the [releases page](https://github.com/docker/extensions-sdk/releases/latest) and install both the Docker Desktop build and the Extensions CLI to manage extensions later on.

Once you've downloaded Extensions CLI, you need to extract the binary into `~/.docker/cli-plugins`.

=== ":fontawesome-brands-apple: MacOS (intel)"

    In a terminal, run:

    ```console
    tar -xvzf desktop-extension-cli-darwin-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-apple: MacOS (arm)"

    In a terminal, run:

    ```console
    tar -xvzf desktop-extension-cli-darwin-arm64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-windows: Windows"

    In a PowerShell terminal, run:

    ```powershell
    tar -xvzf desktop-extension-cli-windows-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension.exe ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-windows: :fontawesome-brands-linux: WSL2"

    In a WSL2 terminal, run:

    ```console
    tar -xvzf desktop-extension-cli-linux-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-linux: Linux"

    In a terminal, run:

    ```console
    tar -xvzf desktop-extension-cli-linux-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

You can now enable Docker Extensions by running 

```console
docker extension enable
```

Now that extensions are enabled, you can list installed extensions (the list should be empty initially):

```console
docker extension ls 
ID                  PROVIDER            VERSION             UI                  VM                  HOST
```

And you should see a new "Add extensions" menu when opening the Docker Desktop Dashboard:

![Extensions enabled](images/extensions-enabled.png)
