# Desktop Plugin Distribution

## Packaging

Docker Desktop plugins are packaged as Docker images. The entire plugin runtime including UI, backend services (host or VM) and any necessary binary must be included in the plugin image.
Every plugin image must contain a metedata.json file at the root of its filesystem, that will [define the contents of the plugin](METADATA.md).

The image must have several labels:

- `org.opencontainers.image.title`: name of the plugin
- `org.opencontainers.image.authors`: author / provider for the plugin
- `com.docker.desktop.plugin.api.version`: Docker API version the plugin is compatible with.

Packaging and releasing a plugin is done with a simple `docker build` to create the image, and `docker push` to make the image available on Docker Hub, with a specific tag allowing to manage version of the plugin.

Plugin authors must take advantage of multi-arch images to build images including ARM/AMD binaries, and the right image will be used for Mac users depending on their architecture.
For plugins for Docker Desktop Windows, Windows binaries to be installed on the host must currently be included in the same plugin image. We will likely revisit this with some tag conventions allowing some images specific to Windows, and other images specific to Mac, based on a tag prefix.

Plugin authors can implement plugins without any constraints on code repository, and Docker does not need access to the code repo in order to use the plugin. Release of new versions of the plugin is entirely managed by plugin authors.

## Distribution and new releases

Releasing a Docker Desktop plugin is done with a simple `docker push` to push the plugin image to Hub.

Docker Desktop will initially include an allow-list of plugins available to users. The plugin image Hub repository (like `mycompany/my-desktop-plugin`) must be part of the Docker Desktop allow-list to be recognised as a plugin

This allow-list will specify which Hub repositories will be used by Docker Desktop to download/install plugins (with a specific version at a given point in time).

Any new image pushed to a repository that is part of the allow-list will correspond to a new version of the plugin, with image tags used to identify version numbers. Plugin versions must follow semver to make it easy to understand and compare versions.

With a given release of Docker Desktop (including some plugins), users should not need to upgrade Docker Desktop in order to obtain new versions of a specific plugin. Plugin authors should be able to release newer versions at their own cadence, independently from Docker Desktop releases (provided there is no plugin API mismatch).

Docker Desktop will scan the allow-list for Hub repositoriy new versions regularly, and provide some notifications to users when they can upgrade a specific plugin.

It will allow downloading and installing the newer version of a plugin, without updating Docker Desktop itself.

## API dependencies

Plugins must specify the plugin API version they rely on (Currently there is no technical validation of this version, as the plugin framework is still experimental).

Docker Desktop can use this plugin API version to detect if a newer version of a plugin is valid given the user current version of Docker Desktop, and if it is, then the user will see a notification to upgrade the corresponding plugin.

This API version that plugins rely upon must be specified in the plugin image labels, allowing Docker Desktop to inspect newer versions of plugin images without downloading the full plugin image upfront.
