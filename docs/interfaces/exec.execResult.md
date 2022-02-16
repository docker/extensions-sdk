# Interface: execResult

[exec](../modules/exec.md).execResult

## Hierarchy

- [`nodeExecResult`](exec.nodeExecResult.md)

  ↳ **`execResult`**

## Table of contents

### Methods

- [lines](exec.execResult.md#lines)
- [parseJsonLines](exec.execResult.md#parsejsonlines)
- [parseJsonObject](exec.execResult.md#parsejsonobject)

### Properties

- [cmd](exec.execResult.md#cmd)
- [killed](exec.execResult.md#killed)
- [signal](exec.execResult.md#signal)
- [code](exec.execResult.md#code)
- [stdout](exec.execResult.md#stdout)
- [stderr](exec.execResult.md#stderr)

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

## Properties

### cmd

• `Optional` `Readonly` **cmd**: `string`

#### Inherited from

[nodeExecResult](exec.nodeExecResult.md).[cmd](exec.nodeExecResult.md#cmd)

___

### killed

• `Optional` `Readonly` **killed**: `boolean`

#### Inherited from

[nodeExecResult](exec.nodeExecResult.md).[killed](exec.nodeExecResult.md#killed)

___

### signal

• `Optional` `Readonly` **signal**: `string`

#### Inherited from

[nodeExecResult](exec.nodeExecResult.md).[signal](exec.nodeExecResult.md#signal)

___

### code

• `Optional` `Readonly` **code**: `number`

#### Inherited from

[nodeExecResult](exec.nodeExecResult.md).[code](exec.nodeExecResult.md#code)

___

### stdout

• `Readonly` **stdout**: `string`

#### Inherited from

[nodeExecResult](exec.nodeExecResult.md).[stdout](exec.nodeExecResult.md#stdout)

___

### stderr

• `Readonly` **stderr**: `string`

#### Inherited from

[nodeExecResult](exec.nodeExecResult.md).[stderr](exec.nodeExecResult.md#stderr)
