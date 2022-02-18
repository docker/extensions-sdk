## Docker objects

### Listing containers

```typescript
const containers = await window.ddClient.listContainers();
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

▸ **listContainers**(`options`): `Promise`<`unknown`\>

Get the list of containers

```typescript
const containers = await window.ddClient.docker.listContainers();
```

#### Parameters

| Name      | Type    | Description                                                                                                                                                                                                                                                                                  |
| :-------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "limit": 10, "size": true, "filters": JSON.stringify({ status: ["exited"] }), }` For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#operation/ContainerList). |

#### Returns

`Promise`<`unknown`\>

---

### Listing images

```typescript
const images = await window.ddClient.listImages();
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

▸ **listImages**(`options`): `Promise`<`unknown`\>

Get the list of local container images

```typescript
const images = await window.ddClient.docker.listImages();
```

#### Parameters

| Name      | Type    | Description                                                                                                                                                                                                                                                         |
| :-------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true }` For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#tag/Image). |

#### Returns

`Promise`<`unknown`\>

---

## Docker commands

You can also directly execute the `docker` binary.

```typescript
const output = await window.ddClient.execDockerCmd(
  "info",
  "--format",
  '"{{ json . }}"'
);
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

```typescript
const output = await window.ddClient.docker.cli.exec("info", [
  "--format",
  '"{{ json . }}"',
]);
```

The result will contain both the standard output and the standard error of the executed command:

```
{
  "stderr": "...",
  "stdout": "..."
}
```

In this example the docker command output is a json output.
For convenience, the command result object also has methods to easily parse it.

- `output.lines(): string[]` split output lines
- `output.parseJsonObject(): any` parse a well formed json output
- `output.parseJsonLines(): any[]` parse each output line as a json object

Streams the output as a result of the execution of a docker command.
Useful when the output of the command is too long or you need to get the output as a stream.

```typescript
window.ddClient.docker.cli.exec("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

Streams the output as a result of the execution of a docker command.
Useful when the output of the command is too long or you need to get the output as a stream.

```typescript
window.ddClient.spawnDockerCmd("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

```typescript
window.ddClient.docker.cli.exec("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```
