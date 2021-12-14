## Validating Your Extension

To enable extension authors to validate their extension before installing and running it locally, the Extensions CLI provides a convenient command:

```console
docker extension validate my-extension
```

This will ensure the image has the right labels needed for extensions, and check the content of the image.

Before the image is built, it is also possible to validate only the metadata.json file:

```console
docker extension validate /path/to/metadata.json
```

## JSON schema

The JSON schema used to validate the `metadata.json` file against can be found under the [releases page](https://github.com/docker/desktop-extension-samples/releases/latest).
