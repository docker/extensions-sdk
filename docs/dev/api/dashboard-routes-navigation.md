# Dashboard Routes Navigation

## Containers

To navigate to the route where all containers are listed, use:

```typescript
window.ddClient.navigateToContainers();
```

### Container

To navigate to a specific container, use:

```typescript
window.ddClient.navigateToContainer(id);
```

- `id` - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`

!!! info

    You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id.

### Container logs

To navigate to the container logs, use:

```typescript
window.ddClient.navigateToContainerLogs(id);
```

- `id` - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`

### Container inspect

To navigate to the container inspect view, use:

```typescript
window.ddClient.navigateToContainerInspect(id);
```

### Container stats

To navigate to the container stats to see the CPU, memory, disk read/write and network I/O usage, use:

```typescript
window.ddClient.navigateToContainerStats(id);
```

- `id` - the full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`

## Images

To navigate to the image list that displays all the images on disk, use:

```typescript
window.ddClient.navigateToImages();
```

### Image

To navigate to a specific image referenced by `id` and `tag`, use:

```typescript
window.ddClient.navigateToImage(id, tag);
```

- `id` - the full image id (including sha), e.g. `sha256:34ab3ae068572f4e85c448b4035e6be5e19cc41f69606535cd4d768a63432673`

- `tag` - the tag of the image, e.g. `latest`, `0.0.1`, etc.

In this navigation route you can find the image layers, commands, created time and size.

## Volumes

To navigate to the list of volumes, use:

```typescript
window.ddClient.navigateToVolumes();
```

### Volume

To navigate to a specific volume, use:

```typescript
window.ddClient.navigateToVolume(volume);
```

- `volume` - the name of the volume, e.g. `my-volume`.

In this navigation route you can see what containers are using the specified volume, and the data inside the volume.

## Dev Environments

To navigate to the Dev Environments tab, use:

```typescript
window.ddClient.navigateToDevEnvironments();
```
