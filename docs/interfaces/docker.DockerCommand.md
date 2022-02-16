# Interface: DockerCommand

[docker](../modules/docker.md).DockerCommand

## Table of contents

### Methods

- [exec](docker.DockerCommand.md#exec)
- [spawn](docker.DockerCommand.md#spawn)

## Methods

### exec

▸ **exec**(`cmd`, ...`args`): `Promise`<[`execResult`](exec.execResult.md)\>

You can also directly execute the docker binary.

```typescript
const output = await window.ddClient.docker.cli.exec(
  "info",
  "--format",
  '"{{ json . }}"'
);
```

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
For convenience, the command result object also has methods to easily parse it. See [execResult](exec.execResult.md) instead.

___

### spawn

▸ **spawn**(`cmd`, `args`, `callback`): `void`

Streams the output as a result of the execution of a docker command.
Useful when the output of the command is too long or you need to get the output as a stream.

```typescript
window.ddClient.docker.cli.spawn("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `callback` | (`data`: `any`, `error`: `any`) => `void` | The callback function where to listen from the command output data and errors. |

#### Returns

`void`
