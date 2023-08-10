# My extension

This sample shows how to implement oauth login with extensions.

This extension is composed of a [frontend](./ui) app in React that shows a login button. When clicked, it will open the browsser to perform a github login, and obtain a oauth token (that will be displayed for the sake of this example).

</details>

## Prepare oauth configuration

In order to run this example, you needed to create a GitHub OAuth app. See details at https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app

You can then get a client ID and client secret from the OAuth app, and set the values in /ui/src/App.tsx

In the OAuth app, you can also set the Authorization callback URL to `docker-desktop://dashboard/extension-tab?extensionId=samples/oauth-extension`. This tells GitHub to redirect to the extension in Docker Desktop at the end of the login process. (Note: this can be configured in code as well, options are dependent on the OAuth provider)

See details about the overall OAuth flow in the [Extension OAuth documentation](https://docs.docker.com/desktop/extensions-sdk/guides/oauth2-flow/)

## Local development

You can use `docker` to build, install and push your extension. Also, we provide an opinionated [Makefile](Makefile) that could be convenient for you. There isn't a strong preference of using one over the other, so just use the one you're most comfortable with.

To build the extension, use `make build-extension` **or**:

```shell
  docker buildx build -t my/awesome-extension:latest . --load
```

To install the extension, use `make install-extension` **or**:

```shell
  docker extension install my/awesome-extension:latest
```

> If you want to automate this command, use the `-f` or `--force` flag to accept the warning message.

To preview the extension in Docker Desktop, open Docker Dashboard once the installation is complete. The left-hand menu displays a new tab with the name of your extension. You can also use `docker extension ls` to see that the extension has been installed successfully.

### Frontend development

During the development of the frontend part, it's helpful to use hot reloading to test your changes without rebuilding your entire extension. To do this, you can configure Docker Desktop to load your UI from a development server.
Assuming your app runs on the default port, start your UI app and then run:

```shell
  cd ui
  npm install
  npm run dev
```

This starts a development server that listens on port `3000`.

You can now tell Docker Desktop to use this as the frontend source. In another terminal run:

```shell
  docker extension dev ui-source my/awesome-extension:latest http://localhost:3000
```

In order to open the Chrome Dev Tools for your extension when you click on the extension tab, run:

```shell
  docker extension dev debug my/awesome-extension:latest
```

Each subsequent click on the extension tab will also open Chrome Dev Tools. To stop this behaviour, run:

```shell
  docker extension dev reset my/awesome-extension:latest
```

### Clean up

To remove the extension:

```shell
docker extension rm my/awesome-extension:latest
```

## What's next?

- To learn more about how to build your extension refer to the Extension SDK docs at https://docs.docker.com/desktop/extensions-sdk/.
- To publish your extension in the Marketplace visit https://www.docker.com/products/extensions/submissions/.
- To report issues and feedback visit https://github.com/docker/extensions-sdk/issues.
- To look for other ideas of new extensions, or propose new ideas of extensions you would like to see, visit https://github.com/docker/extension-ideas/discussions.
