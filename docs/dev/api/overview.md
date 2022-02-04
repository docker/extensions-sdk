# Extension UI API

The extension UI has access to an extension API, allowing:

## Docker APIs

Listing containers:

```typescript
window.ddClient.listContainers();
```

(Or `listContainers({all:true})` to also list stopped containers)

Listing images:

```typescript
window.ddClient.listImages();
```

### Running docker command and getting results

```typescript
window.ddClient
  .execDockerCmd("info", "--format", '"{{ json . }}"')
  .then((cmdResult) => console.log(cmdResult));
```

result will be of the form:

```json
{
  "stderr": "",
  "stdout": "{...}"
}
```

(In this example the docker command output is a json output)

For convenience, the command result object also has methods to easily parse it:

- `cmdResult.lines() : string[]` split output lines
- `cmdResult.parseJsonObject() : any` parse a well formed json output
- `cmdResult.parseJsonLines() : any[]` parse each output line as a json object

If the output of the command is too long or you need to get the output as a
stream you can use the `spawnDockerCmd` function:

```typescript
window.ddClient.spawnDockerCmd("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

## Communication with the Extension Backend

The `window.ddClient.backend` object implements the following interface:

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

Running a command in the container inside the VM:

```typescript
window.ddClient.backend
  .execInVMExtension(`cliShippedInTheVm xxx`)
  .then((cmdResult: any) => console.log(cmdResult));
```

Invoking an extension binary on your host:

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

## Docker Desktop Dashboard APIs

### User messages

Displaying an error message in a red banner on the Dashboard:

```typescript
window.ddClient.toastError("Something went wrong");
```

### Opening a URL in an external browser

Open the given external URL in the system default browser.

Note: the URL must have the protocol `http` or `https`.

```typescript
window.ddClient.openExternal("https://docker.com");
```

### Navigation to Dashboard routes

From your extension, you can navigate to various tabs in Docker Desktop Dashboard.

See details [here](dashboard-routes-navigation.md)
