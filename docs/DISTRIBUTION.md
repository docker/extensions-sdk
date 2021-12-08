# Desktop Extension Distribution

## Packaging

Docker Desktop extensions are packaged as Docker images. The entire extension runtime including UI, backend services (host or VM) and any necessary binary must be included in the extension image.
Every extension image must contain a metadata.json file at the root of its filesystem, that will [define the contents of the extension](METADATA.md).

The image must have several labels:

- `org.opencontainers.image.title`: name of the extension
- `org.opencontainers.image.vendor`: provider for the extension
- `com.docker.desktop.extension.api.version`: Docker API version the extension is compatible with.

Packaging and releasing an extension is done by running `docker build` to create the image, and `docker push` to make the image available on Docker Hub, with a specific tag allowing to manage version of the extension.

Extension authors must take advantage of multi-arch images to build images including ARM/AMD binaries, and the right image will be used for Mac users depending on their architecture.
For extensions for Docker Desktop Windows, Windows binaries to be installed on the host must currently be included in the same extension image. We will likely revisit this with some tag conventions allowing some images specific to Windows, and other images specific to Mac, based on a tag prefix.

Extension authors can implement extensions without any constraints on code repository, and Docker does not need access to the code repo in order to use the extension. Release of new versions of the extension is entirely managed by extension authors.

## Distribution and new releases

Releasing a Docker Desktop extension is done by running `docker push` to push the extension image to Hub.

Docker Desktop will initially include an allow-list of extensions available to users. The extension image Hub repository (like `mycompany/my-desktop-extension`) must be part of the Docker Desktop allow-list to be recognised as a extension.

This allow-list will specify which Hub repositories will be used by Docker Desktop to download/install extensions (with a specific version at a given point in time).

Any new image pushed to a repository that is part of the allow-list will correspond to a new version of the extension, with image tags used to identify version numbers. Extension versions must follow semver to make it easy to understand and compare versions.

With a given release of Docker Desktop (including some extensions), users should not need to upgrade Docker Desktop in order to obtain new versions of a specific extension. Extension authors should be able to release newer versions at their own cadence, independently from Docker Desktop releases (provided there is no Extension API mismatch).

Docker Desktop will scan the allow-list for Hub repositoriy new versions regularly, and provide some notifications to users when they can upgrade a specific extension.

It will allow downloading and installing the newer version of an extension, without updating Docker Desktop itself.

## API dependencies

Extensions must specify the Extension API version they rely on (Currently there is no technical validation of this version, as the extension framework is still experimental).

Docker Desktop can use this Extension API version to detect if a newer version of an extension is valid given the user current version of Docker Desktop, and if it is, then the user will see a notification to upgrade the corresponding extension.

This API version that extensions rely upon must be specified in the extension image labels, allowing Docker Desktop to inspect newer versions of extension images without downloading the full extension image upfront.
