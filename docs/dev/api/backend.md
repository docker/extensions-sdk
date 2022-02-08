## Communication with the backend

The `window.ddClient.backend` object can be used to communicate with the backend
defined in the [vm section](../../extensions/METADATA.md#vm-section) in the
extensions metadata. The client is already connected to the backend.

It implements the following interface

```typescript
interface Backend {
  get(url: string): Promise<unknown>;
  post(url: string, data: any): Promise<unknown>;
  put(url: string, data: any): Promise<unknown>;
  patch(url: string, data: any): Promise<unknown>;
  delete(url: string): Promise<unknown>;
  head(url: string): Promise<unknown>;
  request(config: RequestConfig): Promise<unknown>;
  execInContainer(container: string, cmd: string): Promise<execResult>;
  execInVMExtension(cmd: string): Promise<execResult>;
}

interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  data: any;
}

interface nodeExecResult {
  readonly cmd?: string;
  readonly killed?: boolean;
  readonly signal?: string;
  readonly code?: number;
  readonly stdout: string;
  readonly stderr: string;
}

interface execResult extends nodeExecResult {
  lines(): string[];
  parseJsonLines(): any[];
  parseJsonObject(): any;
}
```

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

## Running a command in the backend container

If your extensions ships with additional binaries that should be run inside the
backend container you can use the `execInVMExtension` function

```typescript
const output = await window.ddClient.backend.execInVMExtension(
  `cliShippedInTheVm xxx`
);
console.log(output);
```

## Invoking an extension binary

You can run binaries defined in the [host section](../../extensions/METADATA.md#host-section)
in the exension metadata.

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((cmdResult: any) => {
  console.log(cmdResult);
});
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
