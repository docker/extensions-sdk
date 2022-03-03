## Communication with the extension backend

The `window.ddClient.extension.vm` object can be used to communicate with the backend defined in the [vm section](../../extensions/METADATA.md#vm-section) in the extensions metadata.

### get

▸ **get**(`url`): `Promise`<`unknown`\>

Performs an HTTP GET request to a backend service.

```typescript
window.ddClient.extension.vm.service
 .get("/some/service")
 .then((value: any) => console.log(value)
```

Other methods for POST, UPDATE, DELETE, etc. are available, see [Service API Reference](reference/interfaces/http_service.HttpService.md#Methods)

### Deprecated extension backend communication

!!! warning "Methods deprecated"

    Methods below using `window.ddClient.backend` are deprecated and will be removed in a future version. Please use the ones specified above.

The `window.ddClient.backend` object can be used to communicate with the backend
defined in the [vm section](../../extensions/METADATA.md#vm-section) in the
extensions metadata. The client is already connected to the backend.

Example usages:

```typescript
window.ddClient.backend
  .get("/some/service")
  .then((value: any) => console.log(value));

window.ddClient.backend
  .post("/some/service", { ... })
  .then((value: any) => console.log(value));

window.ddClient.backend
  .put("/some/service", { ... })
  .then((value: any) => console.log(value));

window.ddClient.backend
  .patch("/some/service", { ... })
  .then((value: any) => console.log(value));

window.ddClient.backend
  .delete("/some/service")
  .then((value: any) => console.log(value));

window.ddClient.backend
  .head("/some/service")
  .then((value: any) => console.log(value));

window.ddClient.backend
  .request({ url: "/url", method: "GET", headers: { 'header-key': 'header-value' }, data: { ... }})
  .then((value: any) => console.log(value));
```

## Running a command in the extension backend container

Executes a command in the backend container.

Example: Execute the command `ls -l` inside the **backend container**:

```typescript
await window.ddClient.extension.vm.cli.exec("ls", ["-l"]);
```

Streams the output of the command executed in the backend container.

Example: Spawn the command `ls -l` inside the **backend container**:

```typescript linenums="1"
await window.ddClient.extension.vm.cli.exec("ls", ["-l"], {
  stream: {
    onOutput(data: { stdout: string } | { stderr: string }): void {
      console.error(data.stdout);
    },
    onError(error: any): void {
      console.error(error);
    },
    onClose(exitCode: number): void {
      console.log("onClose with exit code " + exitCode);
    },
  },
});
```

### Deprecated extension backend command execution

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified above.

If your extensions ships with additional binaries that should be run inside the
backend container you can use the `execInVMExtension` function.

```typescript
const output = await window.ddClient.backend.execInVMExtension(
  `cliShippedInTheVm xxx`
);
console.log(output);
```

## Invoking an extension binary on the host

You can run binaries defined in the [host section](../../extensions/METADATA.md#host-section)
in the exension metadata.

Example: Execute the shipped binary `kubectl -h` command in the **host**:

```typescript
await window.ddClient.extension.host.cli.exec("kubectl", ["-h"]);
```

Example: Provided the `kubectl` binary is shipped as part of your extension, you can spawn the `kubectl -h` command in the **host** and get the output stream:

```typescript linenums="1"
await window.ddClient.extension.host.cli.exec("kubectl", ["-h"], {
  stream: {
    onOutput(data: { stdout: string } | { stderr: string }): void {
      console.error(data.stdout);
    },
    onError(error: any): void {
      console.error(error);
    },
    onClose(exitCode: number): void {
      console.log("onClose with exit code " + exitCode);
    },
  },
});
```

Streams the output of the command executed in the backend container or in the host.

### Deprecated invocation of extension binary

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified above.

Execute a command in the the host:

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((cmdResult: any) => {
  console.log(cmdResult);
});
```

Streams the output of the command executed in the backend container or in the host:

```typescript
window.ddClient.spawnHostCmd(
  `cliShippedOnHost`,
  [`arg1`, `arg2`],
  (data: any, err: any) => {
    console.log(data.stdout, data.stderr);
    // Once the command exits we get the status code
    if (data.code) {
      console.log(data.code);
    }
  }
);
```
