## User notifications

Toasts provide a brief notification to the user. They appear temporarily and
shouldn't interrupt the user experience, they don't require user input to disappear.

### success

▸ **success**(`msg`): `void`

Display a toast message of type success.

```typescript
ddClient.desktopUI.toast.success("message");
```

### warning

▸ **warning**(`msg`): `void`

Display a toast message of type warning.

```typescript
ddClient.desktopUI.toast.warning("message");
```

### error

▸ **error**(`msg`): `void`

Display a toast message of type error.

```typescript
ddClient.desktopUI.toast.error("message");
```

More details about method parameters and return types are available in the [Toast API reference](reference/interfaces/Toast.md).

### Deprecated user notifications

!!! warning "Method deprecated"

    These methods are deprecated and will be removed in a future version. Please use the ones specified above.

```typescript
window.ddClient.toastSuccess("message");
window.ddClient.toastWarning("message");
window.ddClient.toastError("message");
```

## Opening a URL

This function opens an external URL with the system default browser.

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

```typescript
ddClient.host.openExternal("https://docker.com");
```

!!! note

    The URL must have the protocol `http` or `https`.

More details about method parameters and return types are available in the [Desktop host API reference](reference/interfaces/Host.md).

### Deprecated user notifications

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified above.

```typescript
window.ddClient.openExternal("https://docker.com");
```

## Navigation to Dashboard routes

From your extension, you can navigate to other parts of the Docker Desktop Dashboard.

See details [here](dashboard-routes-navigation.md).
