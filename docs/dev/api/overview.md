# UI API

The extension UI has access to an extension API, allowing:

## Common Functions

Listing running containers:

```typescript
window.ddClient.listContainers();
```

Listing images:

```typescript
window.ddClient.listImages();
```

Displaying an error in a red banner on the Dashboard:

```typescript
window.ddClient.toastError("Something went wrong");
```

## Communication with the Extension Backend

Accessing a socket exposed by your extension VM service:

```typescript
window.ddClient.backend
  .get("/some/service")
  .then((value: any) => console.log(value));
```

Running a command in the container inside the VM:

```typescript
window.ddClient.backend
  .execInVMExtension(`cliShippedInTheVm xxx`)
  .then((value: any) => console.log(value));
```

Invoking an extension binary on your host:

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((value: any) => {
  console.log(value);
});
```
