## Developing Docker Extensions

The section below describes how to get started developing your custom Docker Extension.

Extensions can be composed of a visual part displayed in the Docker Desktop Dashboard and, optionally, of one or more services running inside the Docker Desktop VM.

If you intend to develop an extension which consists exclusively of a visual part (no services running in the VM), please refer to [React extension](../tutorials/react-extension.md) tutorial.

If your extension needs to invoke docker commands, have a look at the [Docker cli extension](../tutorials/minimal-frontend-using-docker-cli.md) tutorial.

If your extension requires additional services running in the Docker Desktop VM, have a look at the [VM UI](https://github.com/docker/extensions-sdk/tree/main/samples/vm-ui-plugin) example.

For further inspiration, have a look at the rest of examples in the root of this repository.

### Opening Dev Tools

In order to open the Chrome Dev Tools for your extension when clicking on the extension tab, you can run

```console
docker extension dev debug my-extension
```

Each click on the extension tab will then also open Chrome Dev Tools.
You can stop this behaviour with

```console
docker extension dev reset my-extension
```

After an extension has been deployed, it is also possible to open the Chrome Dev Tools from the UI extension part, using a variation of the [Konami Code](https://en.wikipedia.org/wiki/Konami_Code).
Click on the extension tab, and then hit the key sequence `up, up, down, down, left, right, left, right, p, d, t`. That should open Dev Tools, and give access to the Chrome console, debugger, etc.

### Developing the Extension UI

If your extension has a UI you can see it directly inside Docker Desktop while developing it.
For this you need to first install the extension.
If you then run a development server locally (with `yarn start` for example) you can run the following command:

```console
docker extension dev ui-source my-extension http://localhost:8080
```

This will change the source of the extension UI to your local development server, auto and hot-reload should work now.

!!! info

    Make sure to reopen the Dashboard when you set a new source for the extension's UI.

Once finished, you can reset the extension configuration to the original settings (note this will also reset opening Chrome dev tools if you used `docker extension dev debug my-extension`):

```console
docker extension dev reset my-extension
```

## Show Extension Containers

If your extension is composed of one or more services running as containers in the Docker Desktop VM, you can get easier access to them by showing them in the Docker Desktop Dashboard and when using Docker commands.

In the Docker Desktop Dashboard settings, under `Extension`, there's a `Show Docker Desktop Extensions system containers` option. When this is enabled, you'll be able to view your extension containers - including logs and other technical details - in the Containers view of the Dashboard.
