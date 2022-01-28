# Desktop Extension Samples

This repository includes Desktop Extension samples.

!!! warning

    This work is experimental and still in progress, features and APIs detailed are subject to change.

## Overview

An extension is packaged as a Docker image, and must have a `metadata.json` file at the root of the image filesystem.
This `metadata.json` file describes the content of the extension.

An extension can contain a UI part and backend parts (running either on the host or in the Desktop virtual machine).

Details are described in [Extension structure](extensions/METADATA.md).

Extension distribution will be done through the Docker Hub.
Development of extensions can be done locally without the need to push the extension to Docker Hub.
This is described in [Extension Distribution](extensions/DISTRIBUTION.md).

## Prerequisites

To get started with Docker Extensions you will need a specific Docker Desktop build that comes with extension capabilities.

Go to the [releases page](https://github.com/docker/desktop-extension-samples/releases/latest) and install both the Docker Desktop build and the Extensions CLI to manage extensions later on.

Once you've downloaded Extensions CLI, you need to extract the binary into `~/.docker/cli-plugins`.

=== ":fontawesome-brands-apple: MacOS (intel)"

    In a terminal, run:

    ```console
    tar -xvzf desktop-extension-cli-darwin-amd64.tar.gz
    chmod +x docker-extension
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

    !!! info

        When running the Extensions CLI on macOS you'll see the message: _"docker-extension" cannot be opened because the developer cannot be verified."_ At the moment, the Extensions CLI is not signed by Docker (yet) and you'll need to trust the binary by going to `System Preferences` > `Security & Privacy` > (General tab) click on `Allow Anyway`.

=== ":fontawesome-brands-apple: MacOS (arm)"

    In a terminal, run:

    ```console
    tar -xvzf desktop-extension-cli-darwin-arm64.tar.gz
    chmod +x docker-extension
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

    !!! info

        When running the Extensions CLI on macOS you'll see the message: _"docker-extension" cannot be opened because the developer cannot be verified."_ At the moment, the Extensions CLI is not signed by Docker (yet) and you'll need to trust the binary by going to `System Preferences` > `Security & Privacy` > (General tab) click on `Allow Anyway`.

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

You can now enable the extension feature by running `docker extension enable`.
