# Interface: Exec

[exec](../modules/exec.md).Exec

## Callable

### Exec

▸ **Exec**(`cmd`, `args`): `Promise`<[`ExecResult`](exec.ExecResult.md)\>

Executes a command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |

#### Returns

`Promise`<[`ExecResult`](exec.ExecResult.md)\>

A promise that will resolve once the command finishes.

### Exec

▸ **Exec**(`cmd`, `args`, `options`): `void`

Streams the result of a command if `stream` is specified in the `options` parameter.

Specify the `stream` if the output of your command is too long or if you need to stream things indefinitely (for example container logs).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `options` | `Object` | The list of options. |
| `options.stream` | `Object` | Provides three functions: `onOutput` (invoked every time `stdout` or `stderr` is received), `onError` and `onClose` (invoked when the stream has ended). |
| `options.stream.onOutput?` | (`data`: { `stdout`: `string`  } \| { `stderr`: `string`  }) => `void` | - |
| `options.stream.onError?` | (`error`: `any`) => `void` | - |
| `options.stream.onClose?` | (`exitCode`: `number`) => `void` | - |

#### Returns

`void`
