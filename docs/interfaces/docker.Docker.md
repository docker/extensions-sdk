# Interface: Docker

[docker](../modules/docker.md).Docker

## Table of contents

### Properties

- [cli](docker.Docker.md#cli)

### Methods

- [listContainers](docker.Docker.md#listcontainers)
- [listImages](docker.Docker.md#listimages)

## Properties

### cli

• `Readonly` **cli**: [`DockerCommand`](docker.DockerCommand.md)

## Methods

### listContainers

▸ **listContainers**(`options`): `Promise`<`unknown`\>

Navigate to the container window that displays all the running and stopped containers.

```typescript
const containers = await window.ddClient.docker.listContainers();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{   "all": true,   "limit": 10,   "size": true,   "filters": JSON.stringify({ status: ["exited"] }), }`  For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#operation/ContainerList). |

#### Returns

`Promise`<`unknown`\>

___

### listImages

▸ **listImages**(`options`): `Promise`<`unknown`\>

Navigate to the images window that displays all the container images.

```typescript
const images = await window.ddClient.docker.listImages();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true }`  For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#tag/Image). |

#### Returns

`Promise`<`unknown`\>
