## Validating the extension metadata

To enable extension authors to validate their extension metadata without having to build and install the extension locally, the Extensions CLI provides a convenient command to do so:

```console
docker extension validate /path/to/metadata.json
```

## JSON schema

The JSON schema used to validate the `metadata.json` file against can be found under the [releases page](https://github.com/docker/desktop-extension-samples/releases/latest).
