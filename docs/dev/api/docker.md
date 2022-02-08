## Docker objects

### Listing containers

```typescript
const containers = await window.ddClient.listContainers();
```

This method takes an optional argument in the form of an object:

```json
{
  "all": true,
  "limit": 10,
  "size": true,
  "filters": "..."
}
```

For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#operation/ContainerList)

### Listing images

```typescript
const images = await window.ddClient.listImages();
```

This method takes an optional argument in the form of an object:

```json
{
  "all": true,
  "filters": "...",
  "digests": true
}
```

For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/engine/api/v1.37/#tag/Image)

## Docker commands

You can also directly execute the `docker` binary.

```typescript
const output = await window.ddClient.execDockerCmd("info", "--format", '"{{ json . }}"');
```

The result will contain both the standard output and the standard error of the
executed command

```json
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

If the output of the command is too long or you need to get the output as a
stream you can use the `spawnDockerCmd` function:

```typescript
window.ddClient.spawnDockerCmd("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```
