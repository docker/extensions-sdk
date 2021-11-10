# Desktop Plugin Samples

This repository host Desktop Plugin Samples.

:warning: **This work is experimental and still in progress, features and APIS detailed are subject to change **

## Prerequisites

Install a Docker Desktop build with plugin capabilities, from one of these links:

- mac (intel): https://desktop-stage.docker.com/mac/main/amd64/70167/Docker.dmg
- mac (arm): https://desktop-stage.docker.com/mac/main/arm64/70167/Docker.dmg
- win: https://desktop-stage.docker.com/win/main/amd64/70167/Docker%20Desktop%20Installer.exe

Or you can download the latest available builds from this [PR](https://github.com/docker/pinata/pull/16496) (at the bottom, expand "Show all checks", click on "Details") and install it on your host.

## Plugin Structure

A plugin is packaged as a Docker image, and must have a metadata.json file at the root of the image filesystem.
This metdata.json file describes the content of the plugin.

A plugin can contain A UI part and backend parts (running either on the host or in the Desktop virtual machine).

Details are described in [Plugin structure](docs/METADATA.md)

Plugins are packaged as docker images, plugin distribution will be done through Docker hub registry. This is described in [Plugin Distribution](docs/DISTRIBUTION.md)

## Build, test and install a plugin

This repository contains multiple plugins, each one of them are defined as individual directories at the root of the repository.

To use one of them, go over the directory of the plugin to build and install it in Docker Desktop. The following operations are carried out by a custom CLI named `docker desktop plugin`. This CLI is packaged with Docker Desktop builds with the plugin capability.

Build the plugin:

```cli
make plugin
# or docker build -t my-plugin .
```

Install the plugin:

```cli
docker desktop plugin install my-plugin
```

You can list the plugins that are installed:

```cli
docker desktop plugin ls

PLUGIN              IMAGE                                        UI                    VM                  HOST
tailscale           docker/desktop-tailscale-plugin:0.1          1 tab(Tailscale)      Created(1)          -
telepresence        docker/desktop-telepresence-plugin:0.1       1 tab(Telepresence)   -                   1 binarie(s)
```

(Your plugin should appear there).

To remove the plugin, run:

```cli
docker desktop plugin rm my-plugin
```

To update a plugin with a newer version, run:

```cli
docker desktop plugin update docker/desktop-tailscale-plugin:0.2
```

## Plugin UI API

The plugin UI has access to a plugin API, allowing:

### Common functions

Listing running containers

```typescript
window.ddClient.listContainers();
```

Displaying an error in a red banner in the Dashboard

```typescript
window.ddClient.toastError("Something went wrong");
```

### Communication with the plugin backend

Accessing a socket exposed by your plugin VM service:

```typescript
window.ddClient.backend
  .get("/some/service")
  .then((value: any) => console.log(value));
```

Running a command in the container inside the VM:

```typescript
window.ddClient.backend
  .execInContainer("pluginContainerName", `cliShippedInTheVm xxx`)
  .then((value: any) => console.log(value));
```

Invoking a plugin binary on your host:

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((value: any) => {
  console.log(value);
});
```

## Developing plugin code

### Opening dev tools

Once a plugin is deployed and running, it is possibe to open chrome dev tools from the UI plugin part, using konami code. CLick on the plugin tab, and then hit the key sequence 'up up down down left right left right p d t'. That should open Dev Tools, and give access to the chrome console, debugger, etc.

### Hot reloading the plugin UI

When running the Desktop Dashboard in dev mode, it is possible to also hot-reload the plugin UI.

In a plugin directory, run `yarn start` (or equivalent depending on the plugin UI code and packaging tools) to start the plugin UI on a specific port, for example 3000. If yoru plugin UI is using `yarn`, you can hot-reload the UI part while developing the plugin.

In the desktop repository, go to `client/desktop-ui` and run `yarn dev`.

In the desktop repository, go to `client/desktop` and run `yarn dev --plugin-<my-plugin>-devPort=3000`.

Finally, open the plugin tab in the Docker Desktop UI. Any code changes should reflect live as you modify your plugin code.
