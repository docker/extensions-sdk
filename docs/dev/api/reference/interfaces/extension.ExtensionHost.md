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

**`param`** Command to execute.

**`param`** Arguments of the command to execute.

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

**`param`** Command to execute.

**`param`** Arguments of the command to execute.

**`param`** The callback function where to listen from the command output data and errors.
