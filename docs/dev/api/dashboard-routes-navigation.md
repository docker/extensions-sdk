# Dashboard Routes Navigation

## Containers

To navigate to the route where all containers are listed, use:

```typescript
window.ddClient.navigateToContainers();
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewContainers

**viewContainers**(): `Promise`<`void`\>

Navigate to the containers window in the Dashboard.

```typescript
window.ddClient.desktopUI.navigation.viewContainers();
```

#### Returns

`Promise`<`void`\>

---

### Container

To navigate to a specific container, use:

```typescript
window.ddClient.navigateToContainer(id);
```

- `id` - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewContainer

▸ **viewContainer**(`id`): `Promise`<`void`\>

Navigate to the container window in the Dashboard.

```typescript
await window.ddClient.desktopUI.navigation.viewContainer(id);
```

#### Parameters

| Name | Type     | Description                                                                                                                                                                                            |
| :--- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`void`\>

A promise that fails if the container doesn't exist.

---

### Container logs

To navigate to the container logs, use:

```typescript
window.ddClient.navigateToContainerLogs(id);
```

- `id` - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewContainerLogs

▸ **viewContainerLogs**(`id`): `Promise`<`void`\>

Navigate to the container logs window in the Dashboard.

```typescript
await window.ddClient.desktopUI.navigation.viewContainerLogs(id);
```

#### Parameters

| Name | Type     | Description                                                                                                                                                                                            |
| :--- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`void`\>

A promise that fails if the container doesn't exist.

---

### Container inspect

To navigate to the container inspect view, use:

```typescript
window.ddClient.navigateToContainerInspect(id);
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewContainerInspect

▸ **viewContainerInspect**(`id`): `Promise`<`void`\>

Navigate to the container inspect window in the Dashboard.

```typescript
await window.ddClient.desktopUI.navigation.viewContainerInspect(id);
```

#### Parameters

| Name | Type     | Description                                                                                                                                                                                            |
| :--- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`void`\>

A promise that fails if the container doesn't exist.

---

### Container stats

To navigate to the container stats to see the CPU, memory, disk read/write and network I/O usage, use:

```typescript
window.ddClient.navigateToContainerStats(id);
```

- `id` - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewContainerStats

▸ **viewContainerStats**(`id`): `Promise`<`void`\>

Navigate to the container stats to see the CPU, memory, disk read/write and network I/O usage.

```typescript
await window.ddClient.desktopUI.navigation.viewContainerStats(id);
```

#### Parameters

| Name | Type     | Description                                                                                                                                                                                            |
| :--- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`void`\>

A promise that fails if the container doesn't exist.

---

## Images

To navigate to the image list that displays all the images on disk, use:

```typescript
window.ddClient.navigateToImages();
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewImages

▸ **viewImages**(): `Promise`<`void`\>

Navigate to the images window in the Dashboard.

```typescript
await window.ddClient.desktopUI.navigation.viewImages();
```

#### Returns

`Promise`<`void`\>

---

### Image

To navigate to a specific image referenced by `id` and `tag`, use:

```typescript
window.ddClient.navigateToImage(id, tag);
```

- `id` - the full image id (including sha), e.g. `sha256:34ab3ae068572f4e85c448b4035e6be5e19cc41f69606535cd4d768a63432673`

- `tag` - the tag of the image, e.g. `latest`, `0.0.1`, etc.

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewImage

▸ **viewImage**(`id`, `tag`): `Promise`<`void`\>

Navigate to a specific image referenced by `id` and `tag` in the Dashboard.
In this navigation route you can find the image layers, commands, created time and size.

```typescript
await window.ddClient.desktopUI.navigation.viewImage(id, tag);
```

#### Parameters

| Name  | Type     | Description                                                                                                        |
| :---- | :------- | :----------------------------------------------------------------------------------------------------------------- |
| `id`  | `string` | The full image id (including sha), e.g. `sha256:34ab3ae068572f4e85c448b4035e6be5e19cc41f69606535cd4d768a63432673`. |
| `tag` | `string` | The tag of the image, e.g. `latest`, `0.0.1`, etc.                                                                 |

#### Returns

`Promise`<`void`\>

A promise that fails if the image doesn't exist.

---

## Volumes

To navigate to the list of volumes, use:

```typescript
window.ddClient.navigateToVolumes();
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewVolumes

▸ **viewVolumes**(): `Promise`<`void`\>

Navigate to the volumes window in the Dashboard.

```typescript
window.ddClient.desktopUI.navigation.viewVolumes();
```

#### Returns

`Promise`<`void`\>

---

### Volume

To navigate to a specific volume, use:

```typescript
window.ddClient.navigateToVolume(volume);
```

- `volume` - the name of the volume, e.g. `my-volume`.

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

In this navigation route you can see what containers are using the specified volume, and the data inside the volume.

### viewVolume

▸ **viewVolume**(`volume`): `Promise`<`void`\>

Navigate to a specific volume in the Dashboard.

```typescript
await window.ddClient.desktopUI.navigation.viewVolume(volume);
```

#### Parameters

| Name     | Type     | Description                               |
| :------- | :------- | :---------------------------------------- |
| `volume` | `string` | The name of the volume, e.g. `my-volume`. |

#### Returns

`Promise`<`void`\>

---

## Dev Environments

To navigate to the Dev Environments tab, use:

```typescript
window.ddClient.navigateToDevEnvironments();
```

!!! warning "Method deprecated"

    This method is deprecated and will be removed in a future version. Please use the one specified just below.

### viewDevEnvironments

▸ **viewDevEnvironments**(): `Promise`<`void`\>

Navigate to the Dev Environments window in the Dashboard.

```typescript
window.ddClient.desktopUI.navigation.viewDevEnvironments();
```

#### Returns

`Promise`<`void`\>

---
