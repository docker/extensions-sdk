# Docker Extensions

This repository includes the Extensions CLI and samples to create Docker Extensions.

## Prerequisites

To get started with Docker Extensions you will need the [latest version of Docker Desktop](https://docs.docker.com/desktop/release-notes/). The Docker extension CLI is bundled by default with Docker Desktop version 4.10.0 and higher.

## Tutorials

- [Create a minimal frontend extension](https://docs.docker.com/desktop/extensions-sdk/build/set-up/minimal-frontend-extension/) - a minimal Desktop Extension containing only a UI part based on HTML.
- [Create a minimal backend extension](https://docs.docker.com/desktop/extensions-sdk/build/set-up/minimal-backend-extension/) - a Desktop Extension containing a UI part connecting to a minimal backend.
- [Create a minimal Docker CLI extension](https://docs.docker.com/desktop/extensions-sdk/build/set-up/minimal-frontend-using-docker-cli/) - a minimal Desktop Extension containing only a UI part that invokes Docker CLI commands.
- [Create a ReactJS-based extension](https://docs.docker.com/desktop/extensions-sdk/build/set-up/react-extension/) - a minimal Desktop Extension containing only a UI part based on ReactJS.

## Extensions SDK documentation

Documentation about the Extensions SDK and creating your own extensions can be found [here](https://docs.docker.com/desktop/extensions-sdk/).

[Contributions](https://github.com/docker/docker.github.io/blob/master/CONTRIBUTING.md) are welcome to update/improve documentation content (see extensions SDK under [desktop/extensions-sdk folder](https://github.com/docker/docker.github.io/tree/master/desktop/extensions-sdk))

## Docker Extension Model

Desktop Extensions are packaged and distributed as Docker images.
Development of extensions can be done locally without the need to push the extension to Docker Hub.
This is described in [Extension Distribution](https://docs.docker.com/desktop/extensions-sdk/extensions/DISTRIBUTION/).

The extension image must have some specific content as described in [Extension Metadata](https://docs.docker.com/desktop/extensions-sdk/extensions/METADATA/).

## Developing Docker Extensions

The [Extensions CLI](https://docs.docker.com/desktop/extensions-sdk/dev/usage/) is an extension development tool that can be used to manage Docker extensions.

This repository contains multiple extensions, each one is defined in an individual directories at the root of the repository.
These are Docker developed samples that are not meant to be final products.

To try one of them, navigate to the directory of the extension then [use the CLI to build and install the extension](https://docs.docker.com/desktop/extensions-sdk/build/build-install/) on Docker Desktop.

The [Quickstart guide](https://docs.docker.com/desktop/extensions-sdk/quickstart/) describes how to get started developing your custom Docker Extension. It also covers how to open the Chrome Dev Tools and show the extension containers.

The extension UI has access to an extension API to invoke backend operations from the UI, e.g. listing running containers, images, etc.
Furthermore, you can communicate with your extension backend service or invoke a binary on the host or in the VM.

### UI Guidelines

We are currently in the process of developing our design system but in the meantime, here are some [UI guidelines](https://www.figma.com/file/U7pLWfEf6IQKUHLhdateBI/Docker-Design-Guidelines?node-id=1%3A28771). Docker Desktop's UI is written in React and [Material UI](https://mui.com/), and we strongly recommend adopting this combination in your extensions as well. This brings the benefit of using our [Material UI Theme](https://www.npmjs.com/package/@docker/docker-mui-theme) to easily replicate Docker Desktop's look & feel, and we'll continue to release libraries and utilities targeting this combination.

You can read more about our design guidelines [here](https://docs.docker.com/desktop/extensions-sdk/design/design-guidelines/).
