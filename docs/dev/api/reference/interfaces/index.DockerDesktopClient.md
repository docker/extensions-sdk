# Interface: DockerDesktopClient

[index](../modules/index.md).DockerDesktopClient

## Table of contents

### Properties

- [backend](index.DockerDesktopClient.md#backend)
- [extension](index.DockerDesktopClient.md#extension)
- [desktopUI](index.DockerDesktopClient.md#desktopui)
- [host](index.DockerDesktopClient.md#host)
- [docker](index.DockerDesktopClient.md#docker)

### Container Methods

- [listContainers](index.DockerDesktopClient.md#listcontainers)

### Image Methods

- [listImages](index.DockerDesktopClient.md#listimages)

### Navigation Methods

- [navigateToContainers](index.DockerDesktopClient.md#navigatetocontainers)
- [navigateToContainer](index.DockerDesktopClient.md#navigatetocontainer)
- [navigateToContainerLogs](index.DockerDesktopClient.md#navigatetocontainerlogs)
- [navigateToContainerInspect](index.DockerDesktopClient.md#navigatetocontainerinspect)
- [navigateToContainerStats](index.DockerDesktopClient.md#navigatetocontainerstats)
- [navigateToImages](index.DockerDesktopClient.md#navigatetoimages)
- [navigateToImage](index.DockerDesktopClient.md#navigatetoimage)
- [navigateToVolumes](index.DockerDesktopClient.md#navigatetovolumes)
- [navigateToVolume](index.DockerDesktopClient.md#navigatetovolume)
- [navigateToDevEnvironments](index.DockerDesktopClient.md#navigatetodevenvironments)

### Other Methods

- [execHostCmd](index.DockerDesktopClient.md#exechostcmd)
- [spawnHostCmd](index.DockerDesktopClient.md#spawnhostcmd)
- [execDockerCmd](index.DockerDesktopClient.md#execdockercmd)
- [spawnDockerCmd](index.DockerDesktopClient.md#spawndockercmd)
- [openExternal](index.DockerDesktopClient.md#openexternal)

### Toast Methods

- [toastSuccess](index.DockerDesktopClient.md#toastsuccess)
- [toastWarning](index.DockerDesktopClient.md#toastwarning)
- [toastError](index.DockerDesktopClient.md#toasterror)

## Properties

### backend

• `Readonly` **backend**: `undefined` \| [`Backend`](index.Backend.md)

The `window.ddClient.backend` object can be used to communicate with the backend defined in the vm section in the extensions metadata.
The client is already connected to the backend.

**`deprecated`** :warning: It will be removed in a future version. Use [DockerDesktopClient.extension](index.DockerDesktopClient.md#extension) instead.

___

### extension

• `Readonly` **extension**: [`Extension`](extension.Extension.md)

The `window.ddClient.extension` object can be used to communicate with the backend defined in the vm section in the extensions metadata.
The client is already connected to the backend.

___

### desktopUI

• `Readonly` **desktopUI**: [`DesktopUI`](extension.DesktopUI.md)

___

### host

• `Readonly` **host**: [`Host`](host.Host.md)

___

### docker

• `Readonly` **docker**: [`Docker`](docker.Docker.md)

## Container Methods

### listContainers

▸ **listContainers**(`options`): `Promise`<`unknown`\>

Get the list of containers

```typescript
const containers = await window.ddClient.listContainers();
```

**`deprecated`** :warning: It will be removed in a future version. Use [Docker.listContainers](docker.Docker.md#listcontainers) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{   "all": true,   "limit": 10,   "size": true,   "filters": JSON.stringify({ status: ["exited"] }), }` For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#operation/ContainerList). |

#### Returns

`Promise`<`unknown`\>

___

## Image Methods

### listImages

▸ **listImages**(`options`): `Promise`<`unknown`\>

Get the list of images

```typescript
const images = await window.ddClient.listImages();
```

**`deprecated`** :warning: It will be removed in a future version. Use [Docker.listImages](docker.Docker.md#listimages) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true }`  For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#tag/Image). |

#### Returns

`Promise`<`unknown`\>

___

## Navigation Methods

### navigateToContainers

▸ **navigateToContainers**(): `void`

Navigate to the containers window in the Dashboard.
```typescript
window.ddClient.navigateToContainers()
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewContainers](navigation_intents.NavigationIntents.md#viewcontainers) instead.

#### Returns

`void`

___

### navigateToContainer

▸ **navigateToContainer**(`id`): `Promise`<`any`\>

Navigate to the container window in the Dashboard.
```typescript
await window.ddClient.navigateToContainer(id)
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewContainer](navigation_intents.NavigationIntents.md#viewcontainer) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

___

### navigateToContainerLogs

▸ **navigateToContainerLogs**(`id`): `Promise`<`any`\>

Navigate to the container logs window in the Dashboard.
```typescript
await window.ddClient.navigateToContainer(id)
```

**`deprecated`** :warning: It will be removed in a future version. Use {@link DockerDesktopClient.viewContainerLogs} instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

___

### navigateToContainerInspect

▸ **navigateToContainerInspect**(`id`): `Promise`<`any`\>

Navigate to the container inspect window in the Dashboard.
```typescript
await window.ddClient.navigateToContainerInspect(id)
```

**`deprecated`** :warning: It will be removed in a future version. Use {@link DockerDesktopClient.viewContainerInspect} instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

___

### navigateToContainerStats

▸ **navigateToContainerStats**(`id`): `Promise`<`any`\>

Navigate to the container stats to see the CPU, memory, disk read/write and network I/O usage.

```typescript
await window.ddClient.navigateToContainerInspect(id)
```

**`deprecated`** :warning: It will be removed in a future version. Use {@link DockerDesktopClient.viewContainerStats} instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

___

### navigateToImages

▸ **navigateToImages**(): `void`

Navigate to the images window in the Dashboard.
```typescript
await window.ddClient.navigateToImages(id)
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewImages](navigation_intents.NavigationIntents.md#viewimages) instead.

#### Returns

`void`

___

### navigateToImage

▸ **navigateToImage**(`id`, `tag`): `Promise`<`any`\>

Navigate to a specific image referenced by `id` and `tag` in the Dashboard.
In this navigation route you can find the image layers, commands, created time and size.

```typescript
await window.ddClient.navigateToImage(id, tag)
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewImage](navigation_intents.NavigationIntents.md#viewimage) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full image id (including sha), e.g. `sha256:34ab3ae068572f4e85c448b4035e6be5e19cc41f69606535cd4d768a63432673`. |
| `tag` | `string` | The tag of the image, e.g. `latest`, `0.0.1`, etc. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

___

### navigateToVolumes

▸ **navigateToVolumes**(): `void`

Navigate to the volumes window in the Dashboard.

```typescript
await window.ddClient.navigateToVolumes()
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewVolumes](navigation_intents.NavigationIntents.md#viewvolumes) instead.

#### Returns

`void`

___

### navigateToVolume

▸ **navigateToVolume**(`volume`): `void`

Navigate to a specific volume in the Dashboard.

```typescript
window.ddClient.navigateToVolume(volume)
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewVolume](navigation_intents.NavigationIntents.md#viewvolume) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `volume` | `string` | The name of the volume, e.g. `my-volume`. |

#### Returns

`void`

___

### navigateToDevEnvironments

▸ **navigateToDevEnvironments**(): `void`

Navigate to the Dev Environments window in the Dashboard.

```typescript
window.ddClient.navigateToDevEnvironments()
```

**`deprecated`** :warning: It will be removed in a future version. Use [NavigationIntents.viewDevEnvironments](navigation_intents.NavigationIntents.md#viewdevenvironments) instead.

#### Returns

`void`

___

## Other Methods

### execHostCmd

▸ **execHostCmd**(`cmd`): `Promise`<[`execResult`](exec.execResult.md)\>

You can run binaries defined in the host section in the extension metadata.

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((cmdResult: any) => {
 console.log(cmdResult);
});
```

**`deprecated`** :warning: It will be removed in a future version. Use [ExtensionCli.exec](extension.ExtensionCli.md#exec) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to be executed. |

#### Returns

`Promise`<[`execResult`](exec.execResult.md)\>

___

### spawnHostCmd

▸ **spawnHostCmd**(`cmd`, `args`, `callback`): `void`

Invoke an extension binary on your host and getting the output stream.

```typescript
window.ddClient.spawnHostCmd(
  `cliShippedOnHost`,
  [`arg1`, `arg2`],
  (data: any, err: any) => {
    console.log(data.stdout, data.stderr);
    // Once the command exits we get the status code
    if (data.code) {
      console.log(data.code);
    }
  }
);
```

**`deprecated`** :warning: It will be removed in a future version. Use {@link ExtensionCli.spawn} instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to be executed. |
| `args` | `string`[] | The arguments of the command to execute. |
| `callback` | (`data`: `any`, `error`: `any`) => `void` | The callback function where to listen from the command output data and errors. |

#### Returns

`void`

___

### execDockerCmd

▸ **execDockerCmd**(`cmd`, ...`args`): `Promise`<[`execResult`](exec.execResult.md)\>

You can also directly execute the docker binary.

```typescript
const output = await window.ddClient.execDockerCmd(
  "info",
  "--format",
  '"{{ json . }}"'
);
```

**`deprecated`** :warning: It will be removed in a future version. Use [DockerCommand.exec](docker.DockerCommand.md#exec) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `...args` | `string`[] | The arguments of the command to execute. |

#### Returns

`Promise`<[`execResult`](exec.execResult.md)\>

The result will contain both the standard output and the standard error of the executed command:
```
{
  "stderr": "...",
  "stdout": "..."
}
```
In this example the docker command output is a json output.

For convenience, the command result object also has methods to easily parse it:

- `output.lines(): string[]` split output lines
- `output.parseJsonObject(): any` parse a well formed json output
- `output.parseJsonLines(): any[]` parse each output line as a json object

If the output of the command is too long or you need to get the output as a stream you can use the spawnDockerCmd function:

```typescript
window.ddClient.spawnDockerCmd("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

___

### spawnDockerCmd

▸ **spawnDockerCmd**(`cmd`, `args`, `callback`): `void`

**`deprecated`** :warning: It will be removed in a future version. Use {@link Exec.exec} instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cmd` | `string` |
| `args` | `string`[] |
| `callback` | (`data`: `any`, `error`: `any`) => `void` |

#### Returns

`void`

___

### openExternal

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

```typescript
window.ddClient.openExternal("https://docker.com");
```

**`deprecated`** :warning: It will be removed in a future version. Use [Host.openExternal](host.Host.md#openexternal) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL the browser will open (must have the protocol `http` or `https`). |

#### Returns

`void`

___

## Toast Methods

### toastSuccess

▸ **toastSuccess**(`msg`): `void`

Display a toast message of type success.

```typescript
window.ddClient.toastSuccess("message");
```

**`deprecated`** :warning: It will be removed in a future version. Use [Toast.success](toast.Toast.md#success) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

___

### toastWarning

▸ **toastWarning**(`msg`): `void`

Display a toast message of type warning.

```typescript
window.ddClient.toastWarning("message");
```

**`deprecated`** :warning: It will be removed in a future version. Use [Toast.warning](toast.Toast.md#warning) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

___

### toastError

▸ **toastError**(`msg`): `void`

Display a toast message of type error.

```typescript
window.ddClient.toastError("message");
```

**`deprecated`** :warning: It will be removed in a future version. Use [Toast.error](toast.Toast.md#error) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`
