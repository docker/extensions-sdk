# Interface: Toast

[types](../modules/types.md).Toast

Toasts provide a brief notification to the user.
They appear temporarily and shouldn't interrupt the user experience, they don't require user input to disappear.

## Table of contents

### Methods

- [error](types.Toast.md#error)
- [info](types.Toast.md#info)
- [warning](types.Toast.md#warning)

## Methods

### error

▸ **error**(`msg`): `void`

Display a toast message of type error.

```typescript
window.ddClient.desktopUI.toast.error("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

___

### info

▸ **info**(`msg`): `void`

Display a toast message of type info.

```typescript
window.ddClient.desktopUI.toast.info("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

___

### warning

▸ **warning**(`msg`): `void`

Display a toast message of type error.

```typescript
window.ddClient.desktopUI.toast.error("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the warning. |

#### Returns

`void`
