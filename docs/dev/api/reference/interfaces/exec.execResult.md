# Interface: ExecResult

[exec](../modules/exec.md).ExecResult

## Hierarchy

- [`RawExecResult`](exec.RawExecResult.md)

  ↳ **`ExecResult`**

## Table of contents

### Methods

- [lines](exec.ExecResult.md#lines)
- [parseJsonLines](exec.ExecResult.md#parsejsonlines)
- [parseJsonObject](exec.ExecResult.md#parsejsonobject)

### Properties

- [cmd](exec.ExecResult.md#cmd)
- [killed](exec.ExecResult.md#killed)
- [signal](exec.ExecResult.md#signal)
- [code](exec.ExecResult.md#code)
- [stdout](exec.ExecResult.md#stdout)
- [stderr](exec.ExecResult.md#stderr)

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

[RawExecResult](exec.RawExecResult.md).[cmd](exec.RawExecResult.md#cmd)

___

### killed

• `Optional` `Readonly` **killed**: `boolean`

#### Inherited from

[RawExecResult](exec.RawExecResult.md).[killed](exec.RawExecResult.md#killed)

___

### signal

• `Optional` `Readonly` **signal**: `string`

#### Inherited from

[RawExecResult](exec.RawExecResult.md).[signal](exec.RawExecResult.md#signal)

___

### code

• `Optional` `Readonly` **code**: `number`

#### Inherited from

[RawExecResult](exec.RawExecResult.md).[code](exec.RawExecResult.md#code)

___

### stdout

• `Readonly` **stdout**: `string`

#### Inherited from

[RawExecResult](exec.RawExecResult.md).[stdout](exec.RawExecResult.md#stdout)

___

### stderr

• `Readonly` **stderr**: `string`

#### Inherited from

[RawExecResult](exec.RawExecResult.md).[stderr](exec.RawExecResult.md#stderr)
