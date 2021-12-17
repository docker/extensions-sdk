# Desktop Extension Samples

[![Netlify Status](https://api.netlify.com/api/v1/badges/883a0d5e-15c4-471b-a3e3-84cf27d2fced/deploy-status)](https://app.netlify.com/sites/docker-desktop-extensions/deploys)

This repository includes Desktop Extension samples.

:warning: **This work is experimental and still in progress, features and APIs detailed are subject to change**

## Prerequisites

To get started with Docker Extensions you will need a specific Docker Desktop build that comes with extension capabilities and the Extensions CLI.

See [prerequisites](docs/index.md#prerequisites).

## Tutorials

- [Create a minimal frontend extension](docs/tutorials/minimal-frontend-extension.md) - a minimal Desktop Extension containing only a UI part based on HTML.
- [Create a minimal backend extension](docs/tutorials/minimal-backend-extension.md) - a Desktop Extension containing a UI part connecting to a minimal backend.
- [Create a ReactJS-based extension](docs/tutorials/react-extension.md) - a minimal Desktop Extension containing only a UI part based on ReactJS.

## Extension Structure

Details are described in [Extension structure](docs/extensions/METADATA.md).

## Distribution

Extension distribution will be done through the Docker Hub.
Development of extensions can be done locally without the need to push the extension to Docker Hub.
This is described in [Extension Distribution](docs/extensions/DISTRIBUTION.md).

## Extensions CLI

The Extensions CLI is an extension development tool that can be used to manage Docker extensions. Actions include install, list, remove and validate extensions, among others.

Check out the list of commands available [here](docs/dev/cli/usage.md).

## Build, Test and Install an Extension

This repository contains multiple extensions, each one is defined in an individual directories at the root of the repository.
These are Docker developed samples that are not meant to be final products.

To use one of them, navigate to the directory of the extension then build and install it on Docker Desktop.

This is described in [here](docs/dev/cli/build-test-install-extension.md).

## Extension UI API

The extension UI has access to an extension API that is useful to invoke backend operations from the UI, e.g. listing running containers, images, etc.
Furthermore, you can communicate with your extension backend service or invoking a binary on the host.

For more details see [here](docs/dev/api/overview.md).

## Developing Docker Extensions

The [overview](docs/dev/overview.md) describes how to get started developing your custom Docker Extension. It also covers how to open the Chrome Dev Tools and show the extension containers.

## Build the documentation

We use [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) to create a static site from a set of Markdown files under [docs](./docs).

```bash
docker run --rm -it -p 8000:8000 --rm -v ${PWD}:/docs squidfunk/mkdocs-material
```

Visit http://0.0.0.0:8000/
