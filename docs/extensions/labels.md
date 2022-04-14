[Labels](https://docs.docker.com/engine/reference/builder/#label) are specified in the extension's `Dockerfile` and are used to provide information about the extension.

| Label <div style="width:170px"></div>| Required | Description | Example |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------ | |
| `org.opencontainers.image.title` | Yes | Human-readable title of the image (string). It is what appears in the tab. | my-extension |
| `org.opencontainers.image.description` | Yes | Human-readable description of the software packaged in the image (string) | This extension is cool|
| `org.opencontainers.image.vendor` | Yes | Name of the distributing entity, organization or individual. | Acme, Inc. |
| `com.docker.desktop.extension.api.version` | Yes | Version of the Docker Extension manager that the extension is compatible with. It must follow [semantic versioning](https://semver.org/). | A specific version like `0.1.0` or, a constraint expression: `>= 0.1.0`, `>= 1.4.7, < 2.0` . For your first extension, you can use `docker extension version` to know the SDK API version and specify `>= <SDK_API_VERSION>`.|
| `com.docker.desktop.extension.icon` | No | The extension icon (format: .svg .png .jpg) | <a href="https://docs.docker.com/images/engine.svg" target="__blank">https://docs.docker.com/images/engine.svg<a> |
| `com.docker.extension.screenshots` | No | A JSON array of image URLs and an alternative text displayed to users (in the order they appear in your metadata) in your extension's details page. | `"[{"alt": "alternative text for image 1", "url": "https://foo.bar/image1.png"},{"alt": "alternative text for image2", "url": "https://foo.bar/image2.jpg"}]"` |
| `com.docker.extension.detailed-description` | No | Additional information in plain text or HTML about the extension to be displayed in the details dialog. | `My detailed description` or `<h1>My detailed description</h1>` |
| `com.docker.extension.publisher-url` | No | The publisher website URL to be displayed in the details dialog. | `https://foo.bar` |
| `com.docker.extension.additional-urls` | No | A JSON array of titles and additional URLs displayed to users (in the order they appear in your metadata) in your extension's details page. We recommend displaying the following links if they apply: documentation, support, terms of service and privacy policy links. | `[{"title":"Documentation","url":"https://foo.bar/docs"},{"title":"Support","url":"https://foo.bar/support"},{"title":"Terms of Service","url":"https://foo.bar/tos"},{"title":"Privacy policy","url":"https://foo.bar/privacy-policy"}]` |

!!! warning "Missing required labels"

    If any of the previous _required_ labels are missing in the `Dockerfile`, Docker Desktop will consider the extension invalid and will not appear listed in the Marketplace.

You can validate that these image labels are rendered as you expect.

When you build and install your unpublished extension, you can preview the extension in the Marketplace "installed" tab, and see how the extension labels are rendered in the list and in the details page of the extension.

!!! info "Preview extensions already listed in Marketplace"

    When installing a local image of an extension already published in the marketplace (for example with tag `latest`), your local image is currently not detected as "unpublished".

    You can retag your image in order to have a different image name that is not listed as a published extension, using `docker tag org/published-extension unpublished-extension` and then `docker extension install unpublished-extension`.

![List preview](images/list-preview.png)

![List preview](images/details-preview.png)
