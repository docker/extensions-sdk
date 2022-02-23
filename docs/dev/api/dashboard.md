## User notifications

Toasts provide a brief notification to the user. They appear temporarily and
shouldn't interrupt the user experience, they don't require user input to disappear.

### success

▸ **success**(`msg`): `void`

Display a toast message of type success.

```typescript
window.ddClient.desktopUI.toast.success("message");
```

### warning

▸ **warning**(`msg`): `void`

Display a toast message of type warning.

```typescript
window.ddClient.desktopUI.toast.warning("message");
```
### error

▸ **error**(`msg`): `void`

Display a toast message of type error.

```typescript
window.ddClient.desktopUI.toast.error("message");
```

More details about method parameters and return types are available in the [Toast API reference](reference/interfaces/toast.Toast.md)

!!! warning "Method deprecated"

    These methods are deprecated and will be removed in a future version. Please use the ones specified above.

```typescript
window.ddClient.toastSuccess("message");
window.ddClient.toastWarning("message");
window.ddClient.toastError("Something went wrong");
```

## Opening a URL

This function opens an external URL with the system default browser.

_Note:_ the URL must have the protocol `http` or `https`.

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

```typescript
window.ddClient.host.openExternal("https://docker.com");
```

More details about method parameters and return types are available in the [Desktop host API reference](reference/interfaces/host.Host.md)

### Deprecated user notifications

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified above.

```typescript
window.ddClient.openExternal("https://docker.com");
```

## Navigation to Dashboard routes

From your extension, you can navigate to various tabs in Docker Desktop Dashboard.

See details [here](dashboard-routes-navigation.md)
