# Extension metadata

A Docker Desktop extension image must include a `metadata.json` file at the root of its filesystem. This file describes the content of the extension that must be installed to make it work in Docker Desktop.

A extension can contain (each part is optional):

- A UI part, adding a tab to the Docker Desktop Dashboard
- A VM service, executed in the Desktop VM as one (or several) Docker container(s). These containers can request access to specific resources in the VM, for example by mounting folders in the compose file.
- A list of binaries to be installed on the host

## UI section

The UI part of the extension will be able to communicate at runtime with the extension VM service, or invoke the extension binaries deployed on the host via the Extension API defined below.

The metadata.json file must follow the format :

```json
{
    "name": "volumes-share",
    "provider": "Docker Inc.",
    "icon": "extension-icon.svg",
    "ui": ...
    "vm": ...
    "host": ...
}
```

`ui`, `vm` and `host` sections are optional, depending what a given extension provides, and describe the extension content to be installed.

The `ui` section defines a new tab that will be added to Docker Dashboard. (other UI extension points will likely be available in the future). It follows the form:

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

`root` specifies in which folder the ui code is located in the image filesystem
`src` specifies what is the entrypoint that should be loaded in the extension tab

## VM section

The `vm` section defines a backend service running inside the Desktop VM. It must define either an `image` or a `composefile` value, specifying what service to run in the Desktop VM. By default, developers should specify `image`, and use `composefile` only if they need to use several containers for the backend service, or specific runtime options (like mounting volumes or requesting CAPABILITIES) that can't be expressed just with a Docker image.

In many situations, extension backend services can be defined by using the same image also used to package the extension. (This image must then have a defined `CMD` to start the backend service, in addition to include the extension packaging).
Using the same image for extension packaging and for backend service will make packaging/releasing easier in terms or version management, pushing extension images to Hub, etc.

```json
"vm": {
    "image":"${DESKTOP_PLUGIN_IMAGE}"
},
```

!!! info

    `${DESKTOP_PLUGIN_IMAGE}` is a specific keyword allowed as an easy way to refer to the image packaging the extension ; it is also possible to specify any other full image name here, although in many cases using the same image will make things easier for extension development.

For more advanced use cases, the extension can also specify a custom compose file, and start several containers for the VM extension service, or mount volumes in the VM, require specific CAPABILITIES, etc.

```json
"vm": {
    "composefile":"docker-compose.yaml"
},
```

The vm metadata section should define either `image` or `composefile`. When using `image`, a default compose file will be generated for the extension.

## Host section

The `host` section defines some binaries that must be deployed on the host. (The UI will be able to invoke these binaries through JavaScript APIs)

```json
  "host": {
    "binaries": [
      {
        "darwin": [
          {
            "path": "/darwin/telepresence"
          },
        ],
        "windows": [
          {
            "path": "/windows/kubectl.exe"
          },
        ]
      }
    ]
  }
```

`binaries` defines a list of binaries to be copied from the extension image to the host ; `path` specifies the binary path in the image filesystem. Docker Desktop is responsible for copying these files in its own location, and the JavaScript API will allow invoking these binaries.
