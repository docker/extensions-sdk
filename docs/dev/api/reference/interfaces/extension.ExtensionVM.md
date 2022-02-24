# Interface: ExtensionVM

[extension](../modules/extension.md).ExtensionVM

## Table of contents

### Properties

- [cli](extension.ExtensionVM.md#cli)
- [service](extension.ExtensionVM.md#service)

## Properties

### cli

• `Readonly` **cli**: [`ExtensionCli`](extension.ExtensionCli.md)

Executes a command in the backend container.

Example: Execute the command `ls -l` inside the **backend container**:

```typescript
 await window.ddClient.extension.vm.cli.exec(
   "ls",
   ["-l"]
 );
```

Streams the output of the command executed in the backend container.

Example: Spawn the command `ls -l` inside the **backend container**:

```typescript linenums="1"
await window.ddClient.extension.vm.cli.exec("ls", ["-l"], {
           stream: {
             onOutput(
               data: { stdout: string } | { stderr: string }
             ): void {
                 // As we can receive both `stdout` and `stderr`, we wrap them in a JSON object
                 JSON.stringify(
                   {
                     stdout: data.stdout,
                     stderr: data.stderr,
                   },
                   null,
                   "  "
                 );
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

**`param`** Command to execute.

**`param`** Arguments of the command to execute.

**`param`** The callback function where to listen from the command output data and errors.

___

### service

• `Readonly` **service**: `undefined` \| [`HttpService`](http_service.HttpService.md)
