# Interface: ExtensionHost

[extension](../modules/extension.md).ExtensionHost

## Table of contents

### Properties

- [cli](extension.ExtensionHost.md#cli)

## Properties

### cli

• `Readonly` **cli**: [`ExtensionCli`](extension.ExtensionCli.md)

Executes a command in the the host.

Example: Execute the shipped binary `kubectl -h` command in the **host**:

```typescript
 await window.ddClient.extension.host.cli.exec(
   "kubectl",
   ["-h"]
 );
```

---

Streams the output of the command executed in the backend container or in the host.

Example: Provided the `kubectl` binary is shipped as part of your extension, you can spawn the `kubectl -h` command in the **host**:

```typescript linenums="1"
await window.ddClient.extension.host.cli.exec("kubectl", ["-h"], {
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
