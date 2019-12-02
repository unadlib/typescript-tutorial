# Typescript Tutorial

## 1. Basics

### 1.1 `unkown` / `any` /`never` / `void` / `undefined` / `null`

`unkown` which is the type-safe counterpart of `any` (TypeScript 3.0).

```ts
{
  const any00: { foo: any } = { foo: 10 };
  const unknown00: {foo: unknown } =  { foo: 10 };


  const val1: string = any00.foo;
  const val2: number = unknown00.foo; // Error

  any00.foo.method();
  unknown00.foo.method(); // Error
}
```

`never` type represents the type of values that never occur, `any` isn’t assignable to `never`.

`any` is any type, but doesn't include `never`. In non-strict mode, it is equivalent to `Object`.

```ts
{
  let never00: never;
  let never01: never;
  let never02: never;

  let any00: any;

  never01 = never00; // Error
  any00 = never02; // Error
}

function error(message: string): never {
  throw new Error(message);
}

function fail() {
    return error("Something failed");
}

function infiniteLoop(): never {
    while (true) {
    }
}
```

`void` contains `undefined` and `null` without `--strictNullChecks` flag, when using the `--strictNullChecks` flag, `void` just contains `undefined`.

### 1.2 Object / object / { [K: string]: any } / { [K in string]: any }

`Object` is a type other than `null` and `undefined`.

`object` is a type that represents the non-primitive type.

`{ [K: string]: any }` & `{ [K in string]: any }` can be type alias, they're equivalent to `object`.

`{ [K in string]: any }` can't be defined as an interface, `{ [K: string]: any }` can also be defined as an interface.

* non-strict mode.

```ts
{
  const obj00: Object = { a: 1 };
  const obj01: Object =  [];
  const obj02: Object =  Object.create(null);
  const obj03: Object =  new String('');
  const obj04: Object =  null;
  const obj05: Object =  1;
  const obj06: Object =  '1';
  const obj07: Object =  () => {};
  const obj08: Object =  undefined;
}

{
  const obj00: object = { a: 1 };
  const obj01: object =  [];
  const obj02: object =  Object.create(null);
  const obj03: object =  new String('');
  const obj04: object =  null;
  const obj05: object =  1; // Error
  const obj06: object =  '1'; // Error
  const obj07: object =  () => {};
  const obj08: object =  undefined;
}

```

* strict mode.

```ts
{
  const obj00: Object = { a: 1 };
  const obj01: Object =  [];
  const obj02: Object =  Object.create(null);
  const obj03: Object =  new String('');
  const obj04: Object =  null; // Error
  const obj05: Object =  1;
  const obj06: Object =  '1';
  const obj07: Object =  () => {};
  const obj08: Object =  undefined; // Error
}

{
  const obj00: object = { a: 1 };
  const obj01: object =  [];
  const obj02: object =  Object.create(null);
  const obj03: object =  new String('');
  const obj04: object =  null; // Error
  const obj05: object =  1; // Error
  const obj06: object =  '1'; // Error
  const obj07: object =  () => {};
  const obj08: object =  undefined; // Error
}
```

### 1.3 $Type / $type (string, number, boolean)

`$Type` contains `$type` and `[object $type]`, and `$type` only means itself.

Usually only `$type` type is used (`$type` contains `$type | null | undefined` in non-strict mode).

For example, `String` and `string`:

```ts
{
  const str00: String = 'a';
  const str01: String = new String('a');
}

{
  const str00: string = 'a';
  const str01: string = new String('a'); // Error
}
```

### 1.4 `extends ? :` / `infer` / `extends`

`extends ? :` is commonly used in the generics type inferences, and is often used in conjunction with `infer`.

If just use `extends`, it is often used for type constraints.

```ts
type Foo<T> = T extends string ? never : number;
type Foo0 = Foo<boolean>; // number

type FooBar<T> = T extends { o: infer O } ? O : never;
type fooBar0 = FooBar<{ o: { s: string } }>; // { s: string }
```

### 1.5 `keyof` / `typeof`

`typeof` is a type inference from a value in TypeScript.

`keyof` is used for index type query.

```ts
type Foo = { n: number; s: string };
type Keys = keyof Foo; // "n" | "s", union type

const fn = (s: string) => (e: string): number => e.length + s.length;
type Fn = typeof fn; // type Fn = (s: string) => (e: string) => number

const obj = {l0: { l1: { l2: 'val' } } };
type Obj = typeof obj;
// type Obj = {
//     l0: {
//         l1: {
//             l2: string;
//         };
//     };
// }

const arr0 = ['a', 1, null, undefined];
type Arr0 = typeof arr0; // type Arr0 = (string | number)[]

const arr1= ['a', 1, null, undefined, {}];
type Arr1 = typeof arr1; // type Arr1 = {}[]

const func = <T>(t: T): T => t;
type Func = typeof func; // type A = <T>(t: T) => T

class A<T>{
  s: string;
  t: T;
  bar(s: string) {
    return s.length;
  }
}

const a = new A();
type A1 = typeof a; // type A1 = A<unknown>
```

### 1.6 `abstract` / `interface` / `class`
Constraints without derivation

```ts
interface Foo {
  bar: string;
  foobar(s: string): number; 
}

class FooClazz implements Foo {
  bar: string;
  foobar(s: string): number {
    throw new Error("Method not implemented.");
  }
}

abstract class BarClass {
  bar: string;
  abstract foobar(s: string): number;
}

class BarClazz extends BarClass {
  foobar(s: string): number {
    throw new Error("Method not implemented.");
  }
}
```

### 1.6  Assertions(`!` / `as` / `const`)

```ts
```

### 1.7 Generics Type Usage

#### 1.7.1 

```ts
```

#### 1.7.1 

## 2. Advanced

### 2.1 




