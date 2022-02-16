# Interface: ExtensionCli

[types](../modules/types.md).ExtensionCli

## Table of contents

### Methods

- [exec](types.ExtensionCli.md#exec)
- [spawn](types.ExtensionCli.md#spawn)

## Methods

### exec

▸ **exec**(`cmd`): `Promise`<[`execResult`](types.execResult.md)\>

 Usage:
```typescript
const window.ddClient.vm.cli.exec(cmd)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | Command to execute |

#### Returns

`Promise`<[`execResult`](types.execResult.md)\>

A promise with `execResult`

___

### spawn

▸ **spawn**(`cmd`, `args`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cmd` | `string` |
| `args` | `string`[] |
| `callback` | (`data`: `any`, `error`: `any`) => `void` |

#### Returns

`void`
