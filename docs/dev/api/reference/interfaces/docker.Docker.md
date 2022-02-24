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
Output:
```
{
  "stderr": "...",
  "stdout": "..."
}
```
In this example the docker command output is a json output.
For convenience, the command result object also has methods to easily parse it. See [ExecResult](exec.ExecResult.md) instead.

---

Streams the output as a result of the execution of a docker command.
Useful when the output of the command is too long or you need to get the output as a stream.

```typescript linenums="1"
await window.ddClient.docker.cli.exec("logs", ["-f", "..."], {
           stream: {
             onOutput(
               data: { stdout: string } | { stderr: string }
             ): void {
                 // As we can receive both `stdout` and `stderr`, we wrap them in a JSON object
                 JSON.stringify(
                   {
                     stdout: data.stdout,
                     stderr: data.stderr,
                   },
                   null,
                   "  "
                 );
             },
             onError(error: any): void {
               console.error(error);
             },
             onClose(exitCode: number): void {
               console.log("onClose with exit code " + exitCode);
             },
           },
         });
```

## Methods

### listContainers

▸ **listContainers**(`options?`): `Promise`<`unknown`\>

Get the list of containers

```typescript
const containers = await window.ddClient.docker.listContainers();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `any` | (Optional). A JSON like `{   "all": true,   "limit": 10,   "size": true,   "filters": JSON.stringify({ status: ["exited"] }), }`  For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#operation/ContainerList). |

#### Returns

`Promise`<`unknown`\>

___

### listImages

▸ **listImages**(`options?`): `Promise`<`unknown`\>

Get the list of local container images

```typescript
const images = await window.ddClient.docker.listImages();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `any` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true }`  For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#tag/Image). |

#### Returns

`Promise`<`unknown`\>
