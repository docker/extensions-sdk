# Interface: HttpService

[http-service](../modules/http_service.md).HttpService

## Table of contents

### Methods

- [get](http_service.HttpService.md#get)
- [post](http_service.HttpService.md#post)
- [put](http_service.HttpService.md#put)
- [patch](http_service.HttpService.md#patch)
- [delete](http_service.HttpService.md#delete)
- [head](http_service.HttpService.md#head)
- [request](http_service.HttpService.md#request)

## Methods

### get

▸ **get**(`url`): `Promise`<`unknown`\>

Performs an HTTP GET request to a backend service.

```typescript
window.ddClient.extension.vm.service
 .get("/some/service")
 .then((value: any) => console.log(value)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

___

### post

▸ **post**(`url`, `data`): `Promise`<`unknown`\>

Performs an HTTP POST request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .post("/some/service", { ... })
 .then((value: any) => console.log(value));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the backend service. |
| `data` | `any` | The body of the request. |

#### Returns

`Promise`<`unknown`\>

___

### put

▸ **put**(`url`, `data`): `Promise`<`unknown`\>

Performs an HTTP PUT request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .put("/some/service", { ... })
 .then((value: any) => console.log(value));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the backend service. |
| `data` | `any` | The body of the request. |

#### Returns

`Promise`<`unknown`\>

___

### patch

▸ **patch**(`url`, `data`): `Promise`<`unknown`\>

Performs an HTTP PATCH request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .patch("/some/service", { ... })
 .then((value: any) => console.log(value));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the backend service. |
| `data` | `any` | The body of the request. |

#### Returns

`Promise`<`unknown`\>

___

### delete

▸ **delete**(`url`): `Promise`<`unknown`\>

Performs an HTTP DELETE request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .delete("/some/service")
 .then((value: any) => console.log(value));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

___

### head

▸ **head**(`url`): `Promise`<`unknown`\>

Performs an HTTP HEAD request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .head("/some/service")
 .then((value: any) => console.log(value));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>

___

### request

▸ **request**(`config`): `Promise`<`unknown`\>

Performs an HTTP request to a backend service.

```typescript
 window.ddClient.extension.vm.service
 .request({ url: "/url", method: "GET", headers: { 'header-key': 'header-value' }, data: { ... }})
 .then((value: any) => console.log(value));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`RequestConfig`](http_service.RequestConfig.md) | The URL of the backend service. |

#### Returns

`Promise`<`unknown`\>
