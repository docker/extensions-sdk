In this tutorial you will learn how to create a new Docker Desktop extension.

## Prerequisites

- [Docker Desktop build with Extensions capabilities](https://github.com/docker/extensions-sdk/releases/)
- [Docker Extensions CLI](https://github.com/docker/extensions-sdk/releases/)
- [NodeJS](https://nodejs.org)
- [Go](https://go.dev/dl/)

## Creating a new extension

To create a new extension, use the `init` subcommand and provide a name, for instance:

```bash
docker extension init my-extension
```

You'll be prompted with a series of questions that will help the CLI to generate a set of boilerplate files for you to get started. The questions are related to the extension information, such as the name, description, vendor, etc.

This will create a directory `my-extension` with a bare-bones extension code.

The automatically generated extension contains:

- A backend service that listens on a socket, it has one endpoint `/hello` that returns
  a JSON payload.
- A React frontend that can call the backend and output the backend response.

## Build the extension

As part of the extension boilerplate files, we provide a `Makefile` at the root of the extension directory with targets to build and push the extension.

To build the extension, run:

```bash
cd my-extension
make extension
```

The `make extension` will build your extension and as a result it will generate an image named after the hub repository input that was introduced in the first question.

For instance, if you typed `john/my-extension` as the answer to the following question:

```
? Hub repository (eg. namespace/image on hub): john/my-extension
```

The `make extension` will generate an image with name `john/my-extension`.

## Install the extension

Now that the extension is packaged as a Docker image, let's proceed with the
installation. To do so, we'll use the Docker Extensions CLI.

!!! info "Enable Docker Desktop Extensions"

    Ensure the Extensions capabilities are enabled in the Docker Desktop build
    by running `docker extension enable`

To install the extension in Docker Desktop, run:

```bash
docker extension install john/my-extension
```

If the installation was successful, you should see the following output:

```bash
Installing new extension "john/my-extension"
Installing service in Desktop VM...
Setting additional compose attributes
VM service started
Installing Desktop extension UI for tab "My-Extension"...
Extension UI tab "My-Extension" added.
Extension "my-extension" installed successfully
```

## Preview the extension

You can verify that the extension has been installed successfully using the
following CLI command:

```bash
docker extension ls
```

It outputs all the extensions installed:

```bash
ID                    PROVIDER      VERSION   UI                  VM          HOST
john/my-extension     Docker Inc.             1 tab(My-Extension) Running(1)  -
```

On the left-menu, you should see a new tab with the name `My-Extension`. Click
on it to load the main window that will render a button. When you click on it
you should see the response from the backend

![UI Extension](images/initialized-extension.png)

### Opening Dev Tools

To open the Chrome Developer Tools, see [this](../../dev/overview).

### Iterate faster while developing

To iterate faster and try out new changes when developing the extension, use the `docker extension update` command to uninstall the previous version and install the new one with your latest changes.

### Developing the frontend

If you are working on the frontend code of your extension and don't want to
rebuild the extension image each time you can setup Docker Desktop in a way
that will use your development server instead of the bundled frontend code from
the extension image. To do that, in one terminal start your UI development
server:

```bash
cd ui
npm start
```

This will start a development server that listens on port 3000. You can now tell
Docker Desktop to use this as the frontend source, in another terminal run:

```bash
docker extension dev ui-source my-extension http://localhost:3000
```

Close and reopen the Docker Desktop dashboard and go to your extension, all the
changes to the frontend code will now be immediately visible.

Once you are done you can remove the ui-source override by running

```bash
docker extension dev reset my-extension
```

## Clean up

To remove the extension run:

```bash
docker extension rm my-extension
```

The following output should be displayed:

```bash
Removing extension my-extension...
Removing extension VM service...
Extension removed from Desktop VM
VM service socket forwarding stopped
Extension UI tab My-Extension removed
Extension "my-extension" removed
```
