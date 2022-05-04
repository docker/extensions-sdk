---
title: Docker extension development metadata
description: Docker extension metadata
keywords: Docker, extensions, sdk, metadata
---

# Extension metadata

The image for a Docker extension must include a `metadata.json` file at the root of its filesystem. It describes the content of the extension that must be installed to make it work in Docker Desktop.

With each part being optional, an extension contains:

- A UI part that adds a tab to the dashboard in Docker Desktop.
- A VM service which executes in the Desktop VM as one or several Docker container(s). These containers can request access to specific resources in the VM, for example by mounting folders in the compose file.
- A list of binaries to be installed on the host.

## UI section

The UI part of the extension is able to communicate at runtime with the extension VM service, or invoke the extension binaries deployed on the host via the Extension API defined below.

The format of the metadata.json file must be:

```json
{
    "icon": "extension-icon.svg",
    "ui": ...
    "vm": ...
    "host": ...
}
```

The `ui`, `vm`, and `host` sections are optional and depend on what a given extension provides. They describe the extension content to be installed.

The `ui` section defines a new tab that is added to the dashboard in Docker Desktop. It follows the form:

```json
"ui":{
    "dashboard-tab":
    {
        "title":"MyTitle",
        "root":"/ui",
        "src":"index.html"
    }
}
```

`root` specifies the folder where the ui code is within the image filesystem.
`src` specifies the entrypoint that should be loaded in the extension tab.

Other UI extension points will be available in the future.

## VM section

The `vm` section defines a backend service that runs inside the Desktop VM. It must define either an `image` or a `composefile` value that specifies what service to run in the Desktop VM.

By default you should specify `image`. Only use `composefile` if you need to use several containers for the backend service or specific runtime options, such as mounting volumes or requesting CAPABILITIES, that can't be expressed just with a Docker image.

In many situations, extension backend services can be defined by using the same image also used to package the extension. This image must then have a defined `CMD` to start the backend service, in addition the extension packaging.

If you use the same image for the extension packaging and for the backend service, you make packaging/releasing easier in terms or version management or pushing extension images to Docker Hub, for example.

```json
"vm": {
    "image":"${DESKTOP_PLUGIN_IMAGE}"
},
```

> `${DESKTOP_PLUGIN_IMAGE}` is a specific keyword that allows an easy way to refer to the image packaging the extension. It is also possible to specify any other full image name here. However, in many cases using the same image makes things easier for extension development.

For more advanced use cases, the extension can also:

- Specify a custom compose file.
- Start several containers for the VM extension service.
- Mount volumes in the VM.
- Require specific CAPABILITIES.

```json
"vm": {
    "composefile":"docker-compose.yaml"
},
```

The vm metadata section should define either `image` or `composefile`. When you use `image`, a default compose file is generated for the extension.

## Host section

The `host` section defines a few binaries that must be deployed on the host. The UI is able to invoke these binaries through JavaScript APIs. See [invoking an extension binary on the host](../dev/api/backend.md#invoke-an-extension-binary-on-the-host).

```json
  "host": {
    "binaries": [
      {
        "darwin": [
          {
            "path": "/darwin/myBinary"
          },
        ],
        "windows": [
          {
            "path": "/windows/myBinary.exe"
          },
        ],
        "linux": [
          {
            "path": "/linux/myBinary"
          },
        ]
      }
    ]
  }
```

`binaries` defines a list of binaries to be copied from the extension image to the host.

`path` specifies the binary path in the image filesystem. Docker Desktop is responsible for copying these files in its own location, and the JavaScript API allows invokes these binaries.
