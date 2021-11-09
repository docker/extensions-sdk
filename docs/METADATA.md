# Plugin structure

A Docker Desktop plugin image must include a `metadata.json` file at the root of its filesystem. This file describes the content of the plugin that must be installed to make it work in Docker Desktop.

A plugin can contain (each part is optional):

- A UI part, adding a tab to the Docker Desktop Dashboard
- A VM service, executed in the Desktop VM as one (or several) Docker container(s). These containers can request access to specific resources in the VM, for example by mounting folders in the compose file.
- A list of binaries to be installed on the host

The UI part of the plugin will be able to communicate at runtime with the plugin VM service, or invoke the plugin binaries deployed on the host via the Plugin API defined below.

The metadata.json file must follow the format :

```json
{
    "name": "volumes-share",
    "provider": "Docker Inc.",
    "icon": "plugin-icon.svg",
    "desktop-plugin-version": "v1.0.0-beta.1",
    "ui": ...
    "vm": ...
    "host": ...
}
```

`desktop-plugin-version` is the version of the plugin API (using semver format) that the plugin is compatible with.
`ui`, `vm` and `host` sections are optional, depending what a given plugin provides, and describe the plugin content to be installed.

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
`src` specifies what is the entrypoint that should be loaded in the plugin tab

The `vm` section defines a backend service running inside the Desktop VM. This service is defined as a compose file, starting typically one container (but that is not restricted to just one). It must specify the name of the compose file in the image filesystem.

```json
"vm": {
    "composefile":"docker-compose.yaml"
},
```

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

`binaries` defines a list of binaries to be copied from the plugin image to the host ; `path` specifies the binary path in the image filesystem. Docker Desktop is responsible for copying these files in its own location, and the JavaScript API will allow invoking these binaries.
