In this tutorial you will learn how to create a simple Desktop Extension containing only a UI part based on ReactJS.

## Prerequisites

- [Docker Desktop build with Extensions capabilities](https://github.com/docker/desktop-extension-samples/releases/)
- [Docker Extensions CLI](https://github.com/docker/desktop-extension-samples/releases/)

## UI extension folder structure

In the `templates` folder you can find the `ui-extension` template that contains a ready-to-go example that represents a UI Extension built on ReactJS. Although you can start from an empty directory, it is highly recommended that you start from this official template and change it accordingly to suit your needs.

```bash
.
├── Dockerfile # (1)
├── client # (2)
│   ├── package.json
│   ├── public # (3)
│   │   └── index.html
│   ├── src # (4)
│   │   ├── App.tsx
│   │   ├── globals.d.ts
│   │   ├── index.tsx
│   │   └── react-app-env.d.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── docker.svg # (5)
└── metadata.json # (6)
```

1. Contains the labels, files, dependencies, metadata, and everything required for the extension to run in Docker Desktop.
2. High-level folder containing your front-end app source code.
3. Assets that aren’t compiled or dynamically generated are stored here. These can be static assets like logos or the robots.txt file.
4. The src, or source folder contains all of our React components, external CSS files, and dynamic assets that we'll bring into our component files.
5. The icon that will be displayed in the left-menu of the Docker Desktop Dashboard.
6. A file that provides information about the extension such as the name, description, and version, among others.

## Create a Dockerfile

A `Dockerfile` is one of the mandatory files needed to build and publish your Desktop Extension.

### Labels

| Label | Required | Description | Example |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------ | |
| `org.opencontainers.image.title` | Yes | Human-readable title of the image (string). It is what appears in the tab. | my-extension |
| `org.opencontainers.image.description` | Yes | Human-readable description of the software packaged in the image (string) | This extension is cool|
| `org.opencontainers.image.vendor` | Yes | Name of the distributing entity, organization or individual. | Acme, Inc. |
| `com.docker.desktop.extension.api.version` | Yes | Version of the Docker Extension manager that the extension is compatible with. | `1.0.0-beta.1`|
| `com.docker.desktop.plugin.icon` | No | The extension icon (format? .png? .jpg?) | <a href="https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png" target="__blank">https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png<a> |

```Dockerfile title="Dockerfile (excerpt)" linenums="1"
... (omitted lines) ...

LABEL org.opencontainers.image.title="ui-extension" \
    org.opencontainers.image.description="Your Desktop Extension Description" \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version="1.0.0-beta.1" \
    com.docker.desktop.plugin.icon="https://f-droid.org/repo/icons-640/com.tailscale.ipn.78.png"

... (omitted lines) ...
```

!!! warning "Missing required labels"

    If any of the previous _required_ labels are missing in the `Dockerfile`, Docker Desktop will consider the extension invalid and will not appear listed in the Extensions list.

## Configure the Extension metadata file

### Provide information

A `metadata.json` file is required at the root of your extension directory.

```json title="metadata.json" linenums="1"
{
  "desktop-plugin-version": "1.0.0-beta.1",
  "name": "ui-extension",
  "provider": "Docker Inc.",
  "icon": "docker.svg",
  "ui": {
    "dashboard-tab": {
      "title": "UI Extension",
      "root": "/ui",
      "src": "index.html"
    }
  }
}
```

### Validation

Next, validate the Extension metadata file against the JSON schema file.

```bash
docker extension validate metadata.json
```

If your extension is valid, you should see the following message:

`2021/12/10 10:49:42 The plugin metadata file is valid`.

!!! failure "Did the validation fail?"

    In case the validation failed, please see the output to amend the fields according to the JSON schema rules.

    In the following example, we purposely forgot to set the `provider` field and added a white space character in the `name` field in the `metadata.json` file.

    ```
    2021/12/10 12:34:11 The plugin metadata file is not valid. see errors:
    2021/12/10 12:34:11 - (root): provider is required
    2021/12/10 12:34:11 - name: Does not match pattern '^[a-zA-Z-_]+$'
    invalid plugin metadata file
    ```

## Build the extension

```bash
docker build -t desktop-ui-extension:0.0.1 .
```

### Build the extension for multiple platforms

```bash
docker buildx build --platform=linux/amd64,linux/arm64 -t desktop-ui-extension:0.0.1 .
```

## Install the extension

Now that the extension is packaged as a Docker image, let's proceed with the installation. To do so, we'll use the Docker Extensions CLI.

!!! info "Enable Docker Desktop Extensions"

    Ensure the Extensions capabilities are enabled in the Docker Desktop build by running `docker extension enable`

To install the extension in Docker Desktop, run:

```bash
docker extension install desktop-ui-extension:0.0.1
```

If the installation was successful, you should see the following output:

```bash
Installing new extension "ui-extension" with desktop-ui-extension:0.0.1 ...
Installing Desktop extension UI for tab "UI Extension"...
Extension UI tab "UI Extension" added.
Extension "ui-extension" installed successfully
```

The installation will create a directory under `~/Library/Containers/com.docker.docker/Data/plugins` (MacOS)

```bash
tree ~/Library/Containers/com.docker.docker/Data/plugins/ui-extension/

/Users/felipecruz/Library/Containers/com.docker.docker/Data/plugins/ui-extension/
├── docker.svg
├── host
├── metadata.json
└── ui
    ├── manifest.json
    └── ui
        ├── asset-manifest.json
        ├── index.html
        └── static
            └── js
                ├── 2.805e56bb.chunk.js
                ├── 2.805e56bb.chunk.js.LICENSE.txt
                ├── 2.805e56bb.chunk.js.map
                ├── main.d74bbdc1.chunk.js
                ├── main.d74bbdc1.chunk.js.map
                ├── runtime-main.dc38298c.js
                └── runtime-main.dc38298c.js.map
```

!!! success

    Your extension should have been installed successfully.

## Preview the extension

You can verify that the extension has been installed successfully using the following CLI command:

```bash
docker extension ls
```

It outputs all the extensions installed:

```bash
PLUGIN              PROVIDER            IMAGE                           UI                      VM       HOST
ui-extension #(1)   Docker Inc. (2)     desktop-ui-extension:0.0.1 (3)  1 tab(UI Extension)(4)  -(5)    -(6)
```

1. Name of the extension (from property `name` in `metadata.json`).
2. Provider of the extension (from property `provider` in `metadata.json`)
3. Docker image name
4. Tab name (from property `ui.dashboard-tab.title` in `metadata.json`)
5. No backend services running in the Desktop VM.
6. No binaries deployed on the host.

To preview the extension in Docker Desktop, close and open the Docker Desktop Dashboard once the installation has completed.

On the left-menu, you should see a new tab with the name `UI Extension`. Click on it to load the main window that will render a button on the top-left corner. When you click on it, a pop-up will appear with the message `Hello, World!`.

![UI Extension](../images/ui-extension-hello-world.png){ align=center }

### Opening Dev Tools

To open the Chrome Developer Tools, see [this](../../dev/overview).

## Publish the extension

In order to publish the extension, we have to upload the Docker image to [DockerHub](https://hub.docker.com).

Let's tag the previous image to preprend the account owner at the beginning of the image name:

```bash
docker tag desktop-ui-extension:0.0.1 owner/desktop-ui-extension:0.0.1
```

```bash
docker push owner/desktop-ui-extension:0.0.1
```

!!! warning

    Note that for Docker Extensions images to be listed in Docker Desktop, they must be approved by Docker and be tagged following semantic versioning, e.g: `0.0.1`.

    See [distribution and new releases](../extensions/DISTRIBUTION.md#distribution-and-new-releases) for more information.

    See <a href="https://semver.org/" target="__blank">semver.org</a> to learn more about semantic versioning.

!!! info "Having trouble to push the image?"

    Ensure you are logged into DockerHub. Otherwise, run `docker login` to authenticate.

## Clean up

```bash
docker extension rm ui-extension
```

```bash
Removing extension ui-extension...
Extension UI tab UI Extension removed
Extension "ui-extension" removed
```

## What's next?

See the next [tutorial](../vm-service-extension/) to add a backend service or check the rest of tutorials.
