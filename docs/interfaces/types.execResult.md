# Interface: execResult

[types](../modules/types.md).execResult

## Hierarchy

- [`nodeExecResult`](types.nodeExecResult.md)

  ↳ **`execResult`**

## Table of contents

### Properties

- [cmd](types.execResult.md#cmd)
- [code](types.execResult.md#code)
- [killed](types.execResult.md#killed)
- [signal](types.execResult.md#signal)
- [stderr](types.execResult.md#stderr)
- [stdout](types.execResult.md#stdout)

### Methods

- [lines](types.execResult.md#lines)
- [parseJsonLines](types.execResult.md#parsejsonlines)
- [parseJsonObject](types.execResult.md#parsejsonobject)

## Properties

### cmd

• `Optional` `Readonly` **cmd**: `string`

#### Inherited from

[nodeExecResult](types.nodeExecResult.md).[cmd](types.nodeExecResult.md#cmd)

___

### code

• `Optional` `Readonly` **code**: `number`

#### Inherited from

[nodeExecResult](types.nodeExecResult.md).[code](types.nodeExecResult.md#code)

___

### killed

• `Optional` `Readonly` **killed**: `boolean`

#### Inherited from

[nodeExecResult](types.nodeExecResult.md).[killed](types.nodeExecResult.md#killed)

___

### signal

• `Optional` `Readonly` **signal**: `string`

#### Inherited from

[nodeExecResult](types.nodeExecResult.md).[signal](types.nodeExecResult.md#signal)

___

### stderr

• `Readonly` **stderr**: `string`

#### Inherited from

[nodeExecResult](types.nodeExecResult.md).[stderr](types.nodeExecResult.md#stderr)

___

### stdout

• `Readonly` **stdout**: `string`

#### Inherited from

[nodeExecResult](types.nodeExecResult.md).[stdout](types.nodeExecResult.md#stdout)

## Methods

### lines

▸ **lines**(): `string`[]

Split output lines.

#### Returns

`string`[]

The list of lines.

___

### parseJsonLines

▸ **parseJsonLines**(): `any`[]

Parse each output line as a JSON object.

#### Returns

`any`[]

The list of lines where each line is a JSON object.

___

### parseJsonObject

▸ **parseJsonObject**(): `any`

Parse a well formed JSON output.

#### Returns

`any`

The JSON object.
