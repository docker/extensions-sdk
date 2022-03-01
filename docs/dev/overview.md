## Developing Docker Extensions

The section below describes how to get started developing your custom Docker Extension.

Extensions can be composed of a visual part displayed in the Docker Desktop Dashboard and, optionally, of one or more services running inside the Docker Desktop VM.

If you intend to develop an extension which consists exclusively of a visual part (no services running in the VM), please refer to [swimmingwhale](swimmingwhale).

If your extension requires additional services running in the Docker Desktop VM, have a look at the [VM UI](vm-ui-plugin) example.

For further inspiration, have a look at the rest of examples in the root of this repository.

### Opening Dev Tools

Once an extension is deployed and running, it is possible to open the Chrome Dev Tools from the UI extension part, using a variation of the [Konami Code](https://en.wikipedia.org/wiki/Konami_Code).
Click on the extension tab, and then hit the key sequence `up, up, down, down, left, right, left, right, p, d, t`. That should open Dev Tools, and give access to the Chrome console, debugger, etc.

Or, if you want to systematically open the Chrome Dev Tools for your extension whitout typing a knoami code, you can run 

```console 
docker extension dev debug my-extension
```

Each click on the extension tab will then also open Chrome Dev Tools.
You can stop this behaviour with 

```console
docker extension dev reset my-extension
```

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

Once finished, you can reset the extension configuration to the original settings (note htis will also reset opening chrome dev tools if you used `docker extension dev debug my-extension`):

```console
docker extension dev reset my-extension
```

## Show Extension Containers

If your extension is composed of one or more services running as containers in the Docker Desktop VM, you can get easier access to them by showing them in the Docker Desktop Dashboard and when using Docker commands.

In the Docker Desktop Dashboard settings, under `Extension`, you can select `Show Docker Desktop Extensions system containers`, and you'll be able to see your extension containers as any other one, navigate to logs, etc.
