# Docker Extension SDK

Use the resources in this section to create your own Docker Extension.

!!! warning

    This work is experimental and still in progress. The features and APIs detailed below are subject to change.

## Overview

Extensions are packaged as specially formatted Docker images, which our CLI tool helps to build. At the root of the image filesystem is a `metadata.json` file which describes the content of the extension. It is a fundamental element of a Docker extension. 

An extension can contain a UI part and backend parts that run either on the host or in the Desktop virtual machine. For further details, see [Extension metadata](extensions/METADATA.md).

Extensions are distributed through the Docker Hub.
Development of extensions can be done locally without the need to push the extension to Docker Hub. See [Extensions distribution](extensions/DISTRIBUTION.md) for further details. 

## Prerequisites

Before you create your own extension, you need a specific Docker Desktop build that comes with extension capabilities. 

From the [releases page](https://github.com/docker/extensions-sdk/releases/latest), install both the Docker Desktop build and the Extensions CLI which is used to manage extensions later on.

Once you've downloaded the Extensions CLI, extract the binary in to `~/.docker/cli-plugins`.

In your terminal, run: 

=== ":fontawesome-brands-apple: MacOS (intel)"

  

    ```console
    tar -xvzf desktop-extension-cli-darwin-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-apple: MacOS (arm)"



    ```console
    tar -xvzf desktop-extension-cli-darwin-arm64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-windows: Windows"

    

    ```powershell
    tar -xvzf desktop-extension-cli-windows-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension.exe ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-windows: :fontawesome-brands-linux: WSL2"

   

    ```console
    tar -xvzf desktop-extension-cli-linux-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

=== ":fontawesome-brands-linux: Linux"

    

    ```console
    tar -xvzf desktop-extension-cli-linux-amd64.tar.gz
    mkdir -p ~/.docker/cli-plugins
    mv docker-extension ~/.docker/cli-plugins
    ```

Next, enable Docker Extensions: 

```console
docker extension enable
```

You can then list all your installed extensions:

```console
docker extension ls 
ID                  PROVIDER            VERSION             UI                  VM                  HOST
```

The list will initially be empty.

When you navigate to Docker Desktop, you'll see **Add Extensions** in the left-hand menu.

![Extensions enabled](images/extensions-enabled.png)
