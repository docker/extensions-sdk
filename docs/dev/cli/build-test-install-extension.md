### Enabling Docker Extensions

Prior to managing Docker extensions, you must have Docker Desktop up and running and the Docker Extensions feature enabled.

Initially, you'll need to enable Docker extensions by running `docker extension enable`.

The change takes effect immediately. You do **not** need to restart Docker Desktop.

To verify the feature has been activated successfully, you can try listing the installed Docker extensions with `docker extension ls`.
At this point no extensions have been installed, the output should display no extensions:

```console
PLUGIN              PROVIDER            IMAGE               UI                  VM                  HOST
```

## Build, Test and Install an Extension

This repository contains multiple extensions, each one is defined in an individual directories at the root of the repository.
These are Docker developed samples that are not meant to be final products.

To use one of them, navigate to the directory of the extension then build and install it on Docker Desktop.
The `docker extension` commands are carried out by the Extension CLI which is a developer tool, not included in standard Docker Desktop package.

Build the extension:

```console
make extension
# or docker build -t my-extension .
```

Install the extension:

```console
docker extension install my-extension
```

You can list the extensions that are installed:

```console
docker extension ls

ID                              PROVIDER            VERSION             UI                   VM                  HOST
docker/hub-explorer-extension   Docker Inc.         0.0.2               1 tab(Explore Hub)   Running(1)          1 binarie(s)
tailscale/docker-extension      Tailscale Inc.      0.0.2               1 tab(Tailscale)     Running(1)          1 binarie(s)
```

To remove the extension, run:

```console
docker extension rm my-extension
```

To update an extension with a newer version (local or remote image), run:

```console
docker extension update docker/hub-explorer-extension:0.0.3
```
