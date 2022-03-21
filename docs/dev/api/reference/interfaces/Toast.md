# Interface: Toast

Toasts provide a brief notification to the user.
They appear temporarily and shouldn't interrupt the user experience, they don't require user input to disappear.

## Table of contents

### Methods

- [success](Toast.md#success)
- [warning](Toast.md#warning)
- [error](Toast.md#error)

## Methods

### success

▸ **success**(`msg`): `void`

Display a toast message of type success.

```typescript
window.ddClient.desktopUI.toast.success("message");
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

Display a toast message of type warning.

```typescript
window.ddClient.desktopUI.toast.warning("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the warning. |

#### Returns

`void`

___

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
