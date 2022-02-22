## Communication with the backend

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

!!! warning "Methods deprecated"

    All the methods above are deprecated and will be removed in a future version. Please use the ones specified just below.

The `window.ddClient.extension` object can be used to communicate with the backend defined in the vm section in the extensions metadata.
The client is already connected to the backend.

### get

▸ **get**(`url`): `Promise`<`unknown`\>

Performs an HTTP GET request to a backend service.

```typescript
window.ddClient.extension.vm.service
 .get("/some/service")
 .then((value: any) => console.log(value)
```

#### Parameters

| Name  | Type     | Description                     |
| :---- | :------- | :------------------------------ |
| `url` | `string` | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

---

### post

▸ **post**(`url`, `data`): `Promise`<`unknown`\>

Performs an HTTP POST request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .post("/some/service", { ... })
 .then((value: any) => console.log(value));
```

#### Parameters

| Name   | Type     | Description                     |
| :----- | :------- | :------------------------------ |
| `url`  | `string` | The URL of the backend service. |
| `data` | `any`    | The body of the request.        |

#### Returns

`Promise`<`unknown`\>

---

### put

▸ **put**(`url`, `data`): `Promise`<`unknown`\>

Performs an HTTP PUT request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .put("/some/service", { ... })
 .then((value: any) => console.log(value));
```

#### Parameters

| Name   | Type     | Description                     |
| :----- | :------- | :------------------------------ |
| `url`  | `string` | The URL of the backend service. |
| `data` | `any`    | The body of the request.        |

#### Returns

`Promise`<`unknown`\>

---

### patch

▸ **patch**(`url`, `data`): `Promise`<`unknown`\>

Performs an HTTP PATCH request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .patch("/some/service", { ... })
 .then((value: any) => console.log(value));
```

#### Parameters

| Name   | Type     | Description                     |
| :----- | :------- | :------------------------------ |
| `url`  | `string` | The URL of the backend service. |
| `data` | `any`    | The body of the request.        |

#### Returns

`Promise`<`unknown`\>

---

### delete

▸ **delete**(`url`): `Promise`<`unknown`\>

Performs an HTTP DELETE request to a backend service.

```typescript
window.ddClient.extension.vm.service
  .delete("/some/service")
  .then((value: any) => console.log(value));
```

#### Parameters

| Name  | Type     | Description                     |
| :---- | :------- | :------------------------------ |
| `url` | `string` | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

---

### head

▸ **head**(`url`): `Promise`<`unknown`\>

Performs an HTTP HEAD request to a backend service.

```typescript
window.ddClient.extension.vm.service
  .head("/some/service")
  .then((value: any) => console.log(value));
```

#### Parameters

| Name  | Type     | Description                     |
| :---- | :------- | :------------------------------ |
| `url` | `string` | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

---

### request

▸ **request**(`config`): `Promise`<`unknown`\>

Performs an HTTP request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .request({ url: "/url", method: "GET", headers: { 'header-key': 'header-value' }, data: { ... }})
 .then((value: any) => console.log(value));
```

#### Parameters

| Name     | Type                                                                    | Description                     |
| :------- | :---------------------------------------------------------------------- | :------------------------------ |
| `config` | [`RequestConfig`](./reference/interfaces/http_service.RequestConfig.md) | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

## Running a command in the backend container

If your extensions ships with additional binaries that should be run inside the
backend container you can use the `execInVMExtension` function

```typescript
const output = await window.ddClient.backend.execInVMExtension(
  `cliShippedInTheVm xxx`
);
console.log(output);
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

Executes a command in the backend container.

Example: Execute the command `ls -l` inside the **backend container**:

```typescript
await window.ddClient.extension.vm.cli.exec("ls", ["-l"]);
```

Streams the output of the command executed in the backend container.

Example: Spawn the command `ls -l` inside the **backend container**:

```typescript
await window.ddClient.extension.vm.cli.exec(
  "ls",
  ["-l"],
  (data: any, error: any) => {
    console.log(data);
  }
);
```

## Invoking an extension binary

You can run binaries defined in the [host section](../../extensions/METADATA.md#host-section)
in the exension metadata.

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((cmdResult: any) => {
  console.log(cmdResult);
});
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

Executes a command in the the host.

Example: Execute the shipped binary `kubectl -h` command in the **host**:

```typescript
await window.ddClient.extension.host.cli.exec("kubectl", ["-h"]);
```

Invoking an extension binary on your host and getting the output stream:

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

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

Streams the output of the command executed in the backend container or in the host.

Example: Provided the `kubectl` binary is shipped as part of your extension, you can spawn the `kubectl -h` command in the **host**:

```typescript
await window.ddClient.extension.host.cli.exec(
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
