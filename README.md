# Desktop Plugin Samples

This repository host Desktop Plugin Samples.

:warning: **This work is experimental and still in progress, features and APIS detailed are subject to change **

## Prerequisites

Download the latest Desktop build from this [PR](https://github.com/docker/pinata/pull/16496) (at the bottom, expand "Show all checks", click on "Details") and install it on your host.

## Build, test and install a plugin

This repository contains multiple plugins, each one of them are defined as individual directories at the root of the repository.

To use one of them, go over the directory of the plugin to build and install it in Docker Desktop. The following operations are carried out by a custom CLI named `docker desktop plugin`. For more information about it, click [here](https://github.com/docker/pinata/tree/desktop-plugins/desktop-plugin).

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

## Development workflow of a plugin

In a plugin directory, run `yarn start` (or equivalent depending on the plugin UI code and packaging tools) to start the plugin UI on a specific port, for example 3000.

In the pinata repository, go to `client/desktop-ui` and run `yarn dev`.

In the pinata repository, go to `client/desktop` and run `yarn dev --plugin-<my-plugin>-devPort=3000`.

Finally, open the plugin tab in the Docker Desktop UI. Any code changes should reflect live as you modify your plugin code.

## Plugin API

The plugin API exposes a set of [functions](https://github.com/docker/pinata/blob/desktop-plugins/client/plugin-preload/src/index.ts#L8-L19) that can be used to run commands in the host or in container inside the VM, e.g:

To run a command in your host:

```typescript
window.ddClient
  .execHostCmd(`myBinaryShippedInPlugin xxx`)
  .then((value: any) => {
    console.log(value);
  });
```

To run a command in the container inside the VM:

```typescript
window.ddClient.backend
  .execInContainer("pluginContainerName", `binaryShippedInTheVm`)
  .then((value: any) => console.log(value));
```
