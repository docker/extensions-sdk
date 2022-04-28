# Interface: Host


## Methods

### openExternal

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

```typescript
ddClient.host.openExternal("https://docker.com");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL the browser will open (must have the protocol `http` or `https`). |

#### Returns

`void`

## Properties

### platform

• **platform**: `string`

Returns a string identifying the operating system platform. See https://nodejs.org/api/os.html#osplatform

### arch

• **arch**: `string`

Returns the operating system CPU architecture. See https://nodejs.org/api/os.html#osarch

### hostname

• **hostname**: `string`

Returns the host name of the operating system. See https://nodejs.org/api/os.html#oshostname
