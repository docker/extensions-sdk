# Desktop Extension Samples

This repository host Desktop Extension Samples.

:warning: **This work is experimental and still in progress, features and APIS detailed are subject to change **

## Prerequisites

To get started with Docker Extensions you will need a specific Docker Desktop build that comes with extension capabilities.

Go to the [releases page](https://github.com/docker/desktop-extension-samples/releases/latest) and install both the Docker Desktop build and the Extensions CLI to manage extensions later on.

Once you've downloaded Extensions CLI, you need to extract the binary into `~/.docker/cli-plugins`.

For macOS:

```bash
tar -xvzf desktop-extension-cli-darwin-amd64.tar.gz
chmod +x docker-extension
mkdir -p ~/.docker/cli-plugins
mv docker-extension ~/.docker/cli-plugins
```

> :warning: When running the Extensions CLI in macOS you'll see the message: _"docker-extension" cannot be opened because the developer cannot be verified."_ At the moment, the Extensions CLI is not signed by Docker (yet) and therefore you'll have to trust the binary by going to `System Preferences` > `Security & Privacy` > (General tab) click on `Allow Anyway`.

For Windows :

```bash
tar -xvzf desktop-extension-cli-windows-amd64.tar.gz
mkdir -p ~/.docker/cli-plugins
mv docker-extension.exe ~/.docker/cli-plugins
```

## Extension Structure

An extension is packaged as a Docker image, and must have a `metadata.json` file at the root of the image filesystem.
This `metadata.json` file describes the content of the extension.

An extension can contain a UI part and backend parts (running either on the host or in the Desktop virtual machine).

Details are described in [Extension structure](docs/METADATA.md)

Extensions are packaged as docker images, extension distribution will be done through Docker hub registry. This is described in [Extension Distribution](docs/DISTRIBUTION.md).

## Usage overview

The Extensions CLI can be used to manage Docker extensions such as install, list, remove and validate extensions, among others.

- `docker extension enable` - enable Docker extensions
- `docker extension disable` - disable Docker extensions
- `docker extension install ` - install a Docker Extension with the specified image
- `docker extension ls` - list installed Docker extensions
- `docker extension rm` - remove a Docker extension
- `docker extension update` - removes and re-install a Docker extension
- `docker extension validate` - validate extension metadata file against the JSON schema

### Enabling Docker extensions

Prior to managing Docker extensions, you must have Docker Desktop up and running and the Docker Extensions feature enabled.

Initially, you'll need to enable Docker extensions by running `docker extension enable`.

The change takes effect immediately. You do **not** need to restart Docker Desktop.

To verify the feature has been activated successfully, you can try listing the installed Docker extensions with `docker extension ls`. Given that at this point no extensions have been installed, the output should display no extensions:

```bash
PLUGIN              PROVIDER            IMAGE               UI                  VM                  HOST
```

## Build, test and install an extension

This repository contains multiple extensions, each one of them are defined as individual directories at the root of the repository.

To use one of them, go over the directory of the extension to build and install it in Docker Desktop. The following operations are carried out by the Extensions' CLI named `docker extension`, not included in standard Docker Desktop package.

Build the extension:

```cli
make extension
# or docker build -t my-extension .
```

Install the extension:

```cli
docker extension install my-extension
```

You can list the extensions that are installed:

```cli
docker extension ls

PLUGIN              IMAGE                                        UI                    VM                  HOST
tailscale           docker/desktop-tailscale-extension:0.1          1 tab(Tailscale)      Created(1)          -
telepresence        docker/desktop-telepresence-extension:0.1       1 tab(Telepresence)   -                   1 binarie(s)
```

(Your extension should appear there).

To remove the extension, run:

```cli
docker extension rm my-extension
```

To update an extension with a newer version, run:

```cli
docker extension update docker/desktop-tailscale-extension:0.2
```

## Extension UI API

The extension UI has access to an extension API, allowing:

### Common functions

Listing running containers

```typescript
window.ddClient.listContainers();
```

Listing images

```typescript
window.ddClient.listImages();
```

Displaying an error in a red banner in the Dashboard

```typescript
window.ddClient.toastError("Something went wrong");
```

### Communication with the extension backend

Accessing a socket exposed by your extension VM service:

```typescript
window.ddClient.backend
  .get("/some/service")
  .then((value: any) => console.log(value));
```

Running a command in the container inside the VM:

```typescript
window.ddClient.backend
  .execInContainer("extensionContainerName", `cliShippedInTheVm xxx`)
  .then((value: any) => console.log(value));
```

Invoking an extension binary on your host:

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((value: any) => {
  console.log(value);
});
```

## Developing Docker Extensions

The section below describes how to get started developing your custom Docker Extension.

Extensions can be composed of a visual part displayed in the Docker Desktop Dashboard and, optionally, of one or many services running in the Docker Desktop VM.

If you intend to develop an extension which consists exclusively of a visual part (no services running in the VM), please refer to [swimmingwhale](swimmingwhale).

If your extension requires additional services running in the Docker Desktop VM, have a look at the [tailscale](tailscale) example.

Finally, if you need to deploy binaries as part of your extension's installation, check out the [telepresence](telepresence) example.

For further inspiration, have a look at the rest of examples in the root of this repository.

### Validating your extension's specification

To enable extension authors to validate their extension metadata without having to build and install the extension locally, the Extensions CLI provides a convenient command to do so:

```bash
docker extension validate /path/to/metadata.json
```

The JSON schema used to validate the `metadata.json` file against can be found under the [releases page](https://github.com/docker/desktop-extension-samples/releases/latest).

### Opening dev tools

Once an extension is deployed and running, it is possibe to open chrome dev tools from the UI extension part, using konami code. Click on the extension tab, and then hit the key sequence 'up up down down left right left right p d t'. That should open Dev Tools, and give access to the chrome console, debugger, etc.

## Show Extension containers

If your extension is composed of one or many services running as containers in the Docker Desktop VM, you can get easier access to them by showing them in the Docker Desktop Dashboard and when using Docker commands.

In the Docker Desktop Dashboard settings, under `Extension`, you can select `Show Docker Desktop Extensions system containers`, and you'll be able to see your extension containers as any other one, navigate to logs, etc.
