Labels are specified in the extension's `Dockerfile` and are use to provide information about the extension.

| Label <div style="width:300px"></div>| Required | Description | Example |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------ | |
| `org.opencontainers.image.title` | Yes | Human-readable title of the image (string). It is what appears in the tab. | my-extension |
| `org.opencontainers.image.description` | Yes | Human-readable description of the software packaged in the image (string) | This extension is cool|
| `org.opencontainers.image.vendor` | Yes | Name of the distributing entity, organization or individual. | Acme, Inc. |
| `com.docker.desktop.extension.api.version` | Yes | Version of the Docker Extension manager that the extension is compatible with. It must follow [semantic versioning](https://semver.org/). | It could be a specific version like `0.1.0` or, a constraint expression: `>= 0.1.0`, `>= 1.4.7, < 2.0` . If this is your first extension, you can use `docker extension version` to know the SDK API version and specify `>= <SDK_API_VERSION>`.|
| `com.docker.desktop.extension.icon` | No | The extension icon (format: .svg .png .jpg) | <a href="https://docs.docker.com/images/engine.svg" target="__blank">https://docs.docker.com/images/engine.svg<a> |
| `com.docker.extension.screenshots` | No | A list of images in the shape of comma-separated URLs to be displayed in the details dialog, in the order on which they’ve been defined. | `https://foo.bar/image1.png,https://foo.bar/image2.jpg` |
| `com.docker.extension.detailed-description` | No | Additional information in plain text or HTML about the extension to be displayed in the details dialog. | `My detailed description` or `<h1>My detailed description</h1>` |
| `com.docker.extension.publisher-url` | No | The publisher website URL to be displayed in the details dialog. | `https://foo.bar` |
| `com.docker.extension.additional-urls` | No | A list of additional URLs to be displayed displayed in the details dialog, in the order on which they’ve been defined. We recommend to display the following links if they apply: documentation, support, terms of service and privacy policy links. | `[{"title":"Documentation","url":"https://foo.bar/docs"},{"title":"Support","url":"https://foo.bar/support"},{"title":"Terms of Service","url":"https://foo.bar/tos"},{"title":"Privacy policy","url":"https://foo.bar/privacy-policy"}]` |

!!! warning "Missing required labels"

    If any of the previous _required_ labels are missing in the `Dockerfile`, Docker Desktop will consider the extension invalid and will not appear listed in the Extensions list.
