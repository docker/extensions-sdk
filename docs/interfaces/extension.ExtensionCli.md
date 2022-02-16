# Interface: ExtensionCli

[extension](../modules/extension.md).ExtensionCli

## Table of contents

### Methods

- [exec](extension.ExtensionCli.md#exec)
- [spawn](extension.ExtensionCli.md#spawn)

## Methods

### exec

▸ **exec**(`cmd`, `args`): `Promise`<[`execResult`](exec.execResult.md)\>

Executes a command in the backend container or in the host.

Example: Execute the command `ls -l` inside the **backend container**:

```typescript
 await window.ddClient.extension.vm.cli.exec(
   "ls",
   ["-l"]
 );
```

Example: Execute the shipped binary `kubectl -h` command in the **host**:

```typescript
 await window.ddClient.extension.host.cli.exec(
   "kubectl",
   ["-h"]
 );
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | Command to execute. |
| `args` | `string`[] | Arguments of the command to execute. |

#### Returns

`Promise`<[`execResult`](exec.execResult.md)\>

___

### spawn

▸ **spawn**(`cmd`, `args`, `callback`): `void`

Streams the output of the command executed in the backend container or in the host.

Example: Spawn the command `ls -l` inside the **backend container**:

```typescript
 await window.ddClient.extension.vm.cli.spawn(
   "ls",
   ["-l"],
   (data: any, error: any) => {
     console.log(data);
   }
 );
```
Example: Provided the `kubectl` binary is shipped as part of your extension, you can spawn the `kubectl -h` command in the **host**:

```typescript
 await window.ddClient.extension.host.cli.spawn(
   "kubectl",
   ["-h"],
   (data: any, error: any) => {
     // Once the command exits we get the status code
     if (data.code) {
       console.log(data.code);
      }
   }
 );
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | Command to execute. |
| `args` | `string`[] | Arguments of the command to execute. |
| `callback` | (`data`: `any`, `error`: `any`) => `void` | The callback function where to listen from the command output data and errors. |

#### Returns

`void`
