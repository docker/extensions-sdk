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

You can also directly execute the docker binary.

```typescript
const output = await window.ddClient.docker.cli.exec(
  "info",
  ["--format", '"{{ json . }}"']
);
```

**`param`** The command to execute.

**`param`** The arguments of the command to execute.

**`returns`** The result will contain both the standard output and the standard error of the executed command:
```
{
  "stderr": "...",
  "stdout": "..."
}
```
In this example the docker command output is a json output.
For convenience, the command result object also has methods to easily parse it. See [execResult](exec.execResult.md) instead.

Streams the output as a result of the execution of a docker command.
Useful when the output of the command is too long or you need to get the output as a stream.

```typescript
window.ddClient.docker.cli.exec("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

## Methods

### listContainers

▸ **listContainers**(`options`): `Promise`<`unknown`\>

Get the list of containers

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

Get the list of local container images

```typescript
const images = await window.ddClient.docker.listImages();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true }`  For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#tag/Image). |

#### Returns

`Promise`<`unknown`\>
