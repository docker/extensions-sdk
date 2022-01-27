Labels are specified in the extension's `Dockerfile` and are use to provide information about the extension.

| Label | Required | Description | Example |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------ | |
| `org.opencontainers.image.title` | Yes | Human-readable title of the image (string). It is what appears in the tab. | my-extension |
| `org.opencontainers.image.description` | Yes | Human-readable description of the software packaged in the image (string) | This extension is cool|
| `org.opencontainers.image.vendor` | Yes | Name of the distributing entity, organization or individual. | Acme, Inc. |
| `com.docker.desktop.extension.api.version` | Yes | Version of the Docker Extension manager that the extension is compatible with. It must follow [semantic versioning](https://semver.org/). | It could be a specific version like `0.1.0` or, a constraint expression: `>= 0.1.0`, `>= 1.4.7, < 2.0` |
| `com.docker.desktop.plugin.icon` | No | The extension icon (format? .png? .jpg?) | <a href="https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png" target="__blank">https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png<a> |

!!! warning "Missing required labels"

    If any of the previous _required_ labels are missing in the `Dockerfile`, Docker Desktop will consider the extension invalid and will not appear listed in the Extensions list.
