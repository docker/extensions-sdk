# Docker Extensions

[![Netlify Status](https://api.netlify.com/api/v1/badges/883a0d5e-15c4-471b-a3e3-84cf27d2fced/deploy-status)](https://app.netlify.com/sites/docker-desktop-extensions/deploys)

This repository includes all resources to create Docker Extensions.

:warning: **This work is experimental and still in progress, features and APIs are subject to change**

## Documentation

The documentation is published and best viewed at https://docker-desktop-extensions.netlify.app/.
(Temporary as this repo is still private, password to use to enter this docs site: BGxdgkadXBDBfm5J)

## Prerequisites

To get started with Docker Extensions you will need a specific Docker Desktop build that comes with extension capabilities and the Extensions CLI.

See [prerequisites](docs/index.md#prerequisites).

## Tutorials

- [Create a minimal frontend extension](docs/tutorials/minimal-frontend-extension.md) - a minimal Desktop Extension containing only a UI part based on HTML.
- [Create a minimal backend extension](docs/tutorials/minimal-backend-extension.md) - a Desktop Extension containing a UI part connecting to a minimal backend.
- [Create a ReactJS-based extension](docs/tutorials/react-extension.md) - a minimal Desktop Extension containing only a UI part based on ReactJS.

## Docker Extension Model

Desktop Extensions are packaged and distributed as Docker images.
Development of extensions can be done locally without the need to push the extension to Docker Hub.
This is described in [Extension Distribution](docs/extensions/DISTRIBUTION.md).

The extension image must have some specific content, described [here](docs/extensions/METADATA.md)

## Developing Docker Extensions

The [Extensions CLI](docs/dev/cli/usage.md) is an extension development tool that can be used to manage Docker extensions.

This repository contains multiple extensions, each one is defined in an individual directories at the root of the repository.
These are Docker developed samples that are not meant to be final products.

To try one of them, navigate to the directory of the extension then [use the CLI to build and install the extension](docs/dev/cli/build-test-install-extension.md) on Docker Desktop.

The [overview](docs/dev/overview.md) describes how to get started developing your custom Docker Extension. It also covers how to open the Chrome Dev Tools and show the extension containers.

The extension UI has access to an extension API to invoke backend operations from the UI, e.g. listing running containers, images, etc.
Furthermore, you can communicate with your extension backend service or invoke a binary on the host or in the VM.

## Build the documentation

We use [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) to create a static site from a set of Markdown files under [docs](./docs).

```bash
docker run --rm -it -p 8000:8000 --rm -v ${PWD}:/docs squidfunk/mkdocs-material
```

Visit http://0.0.0.0:8000/
