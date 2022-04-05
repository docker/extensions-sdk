# Dashboard Routes Navigation

`ddClient.desktopUI.navigation` allow to navigate to specific screens of the Docker Desktop Dashboard like containers view, images view, a specific container logs, a specific image details, volumes, dev environments.

Example: navigate to a given container logs

```typescript
await ddClient.desktopUI.navigation.viewContainerLogs(id);
```

#### Parameters

| Name | Type     | Description                                                                                                                                                                                            |
| :--- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`void`\>

A promise that fails if the container doesn't exist.

---

Use the [Navigation API reference](reference/interfaces/NavigationIntents.md) for details about all navigation methods to containers, images, volumes and dev environments.

### Deprecated navigation methods

!!! warning "Method deprecated"

    These methdos are deprecated and will be removed in a future version. Please use the ones specified above.

```typescript
window.ddClient.navigateToContainers();
// id - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`
window.ddClient.navigateToContainer(id);
window.ddClient.navigateToContainerLogs(id);
window.ddClient.navigateToContainerInspect(id);
window.ddClient.navigateToContainerStats(id);

window.ddClient.navigateToImages();
window.ddClient.navigateToImage(id, tag);

window.ddClient.navigateToVolumes();
window.ddClient.navigateToVolume(volume);

window.ddClient.navigateToDevEnvironments();
```
