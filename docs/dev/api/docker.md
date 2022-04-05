## Docker objects

▸ **listContainers**(`options?`): `Promise`<`unknown`\>

Get the list of containers

```typescript
const containers = await ddClient.docker.listContainers();
```

▸ **listImages**(`options?`): `Promise`<`unknown`\>

Get the list of local container images

```typescript
const images = await ddClient.docker.listImages();
```

Use the [Docker API reference](reference/interfaces/Docker.md) for details about these methods

### Deprecated access to Docker objects

!!! warning "Method deprecated"

    These methods are deprecated and will be removed in a future version. Please use the ones specified above.

```typescript
const containers = await window.ddClient.listContainers();

const images = await window.ddClient.listImages();
```

## Docker commands

Extensions can also directly execute the `docker` command line.

▸ **exec**(`cmd`, `args`): `Promise`<[`ExecResult`](reference/interfaces/ExecResult.md)\>

```typescript
const result = await ddClient.docker.cli.exec("info", [
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

- `result.lines(): string[]` split output lines
- `result.parseJsonObject(): any` parse a well formed json output
- `result.parseJsonLines(): any[]` parse each output line as a json object

▸ **exec**(`cmd`, `args`, `options`): `void`

Streams the output as a result of the execution of a docker command.
Useful when you need to get the output as a stream or the output of the command is too long.

```typescript linenums="1"
await ddClient.docker.cli.exec("logs", ["-f", "..."], {
  stream: {
    onOutput(data) {
      if (data.stdout) {
        console.error(data.stdout);
      } else {
        console.log(data.stderr);
      }
    },
    onError(error) {
      console.error(error);
    },
    onClose(exitCode) {
      console.log("onClose with exit code " + exitCode);
    },
    splitOutputLines: true,
  },
});
```

This can also be useful to listen to docker events:

```typescript linenums="1"
await ddClient.docker.cli.exec(
  "events",
  ["--format", "{{ json . }}", "--filter", "container=my-container"],
  {
    stream: {
      onOutput(data) {
        if (data.stdout) {
          const event = JSON.parse(data.stdout);
          console.log(event);
        } else {
          console.log(data.stderr);
        }
      },
      onClose(exitCode) {
        console.log("onClose with exit code " + exitCode);
      },
      splitOutputLines: true,
    },
  }
);
```

Use the [Exec API reference](reference/interfaces/Exec.md) for details about these methods

### Deprecated execution of Docker commands

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

```typescript
const output = await window.ddClient.execDockerCmd(
  "info",
  "--format",
  '"{{ json . }}"'
);

window.ddClient.spawnDockerCmd("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```
