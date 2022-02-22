# Interface: Exec

[exec](../modules/exec.md).Exec

## Callable

### Exec

▸ **Exec**(`cmd`, `args`): `Promise`<[`execResult`](exec.execResult.md)\>

Executes a command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |

#### Returns

`Promise`<[`execResult`](exec.execResult.md)\>

A promise that will resolve once the command finishes.

### Exec

▸ **Exec**(`cmd`, `args`, `callback`): `void`

Executes a command and calls the `callback` each time there is new output.

Use the `callback` if the output of your command is too long or if you need to stream things indefinitely (for example container logs).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `callback` | (`data`: `any`, `error`: `any`) => `void` | The callback function where to listen from the command output data and errors. |

#### Returns

`void`
