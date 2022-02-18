## User notifications

Toasts provide a brief notification to the user. They appear temporarily and
shouldn't interrupt the user experience, they don't require user input to disappear.

### success

```typescript
window.ddClient.toastSuccess("message");
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

▸ **success**(`msg`): `void`

Display a toast message of type success.

```typescript
window.ddClient.desktopUI.toast.success("message");
```

#### Parameters

| Name  | Type     | Description                          |
| :---- | :------- | :----------------------------------- |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

---

### warning

```typescript
window.ddClient.toastWarning("message");
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

▸ **warning**(`msg`): `void`

Display a toast message of type warning.

```typescript
window.ddClient.desktopUI.toast.warning("message");
```

#### Parameters

| Name  | Type     | Description                            |
| :---- | :------- | :------------------------------------- |
| `msg` | `string` | The message to display in the warning. |

#### Returns

`void`

---

### error

```typescript
window.ddClient.toastError("Something went wrong");
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

▸ **error**(`msg`): `void`

Display a toast message of type error.

```typescript
window.ddClient.desktopUI.toast.error("message");
```

#### Parameters

| Name  | Type     | Description                          |
| :---- | :------- | :----------------------------------- |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

---

## Opening a URL

This function opens an external URL with the system default browser.

```typescript
window.ddClient.openExternal("https://docker.com");
```

_Note:_ the URL must have the protocol `http` or `https`.

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

```typescript
window.ddClient.host.openExternal("https://docker.com");
```

#### Parameters

| Name  | Type     | Description                                                               |
| :---- | :------- | :------------------------------------------------------------------------ |
| `url` | `string` | The URL the browser will open (must have the protocol `http` or `https`). |

#### Returns

`void`

---

## Navigation to Dashboard routes

From your extension, you can navigate to various tabs in Docker Desktop Dashboard.

See details [here](dashboard-routes-navigation.md)
