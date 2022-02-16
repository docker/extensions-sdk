# Extension UI API

The extensions UI runs in a sandboxed environment and doesn't have access to any
electron or nodejs APIs.

The extension UI API provides a way for the frontend to perform different actions
and communicate with the Docker Desktop dashboard or the underlying system.

- [Docker Desktop Client](../../interfaces/index.DockerDesktopClient.md)
- [Extension](../../interfaces/extension.Extension.md)
- [Docker](../../interfaces/docker.Docker.md)
- [Docker Command](../../interfaces/docker.DockerCommand.md)
- [User notifications](../../interfaces/toast.Toast.md)
- [Opening a URL](../../interfaces/host.Host.md)
- [Navigation](../../interfaces/types.NavigationIntents.md)
