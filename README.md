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

`Object` is a type other than `null` and `undefined`, **it has not derivations**.

`object` is a type that represents the non-primitive type.

`{ [K: string]: any }` & `{ [K in string]: any }` can be type alias, they're equivalent to `object`, **but `object` has not derivations**.

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

`abstract` and `interface` have constraints without derivations for `class`.

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

### 1.6  Assertions(`!` / `as` / `<type>` / `const`)

* `!` is non-null assertion operator in TypeScript(`--strictNullChecks` mode).

```ts
const a: { foo?: { bar?: { [K: string]: any } } } = {};
if (a.foo!.bar!.foobar) {}
```

* Both `as` and `<type>` are assertion operators, they're equivalent.

**Assertions can only be used for subset relationships.**

```ts
interface B { str: string };
const b0 = { num: 1 } as B; // Error
const b1 = ({ num: 1 } as any) as B;
const b2 = <B>({ num: 1 } as any);
const b3: B = { num: 1 } as any;
```

* `const` is a `readonly` or non-expandable assertion operator(TypeScript 3.4).

```ts
const c0 = {
  e: 0,
  f: 1
} as const;
c0.e = 1; // Error
const c = <const>['a', 'b'];
c[0] = 'f'; // Error
```

### 1.7 Generics Type Usage

```ts
type Foo<T> = T;
interface Bar<T> {
  t: T;
}

const fn = <T>(t: T): T => t; 
class A<T> {
  t: T;
};
new A<number>();

class B<T extends {num: number}> extends A<T> {}
new B(); // OK
new B<{num: number; str: string}>(); // OK
new B<{str: string}>(); // Error
new B<any>(); // OK
new B<never>(); // OK
new B<{[K: string]: any}>(); // Error
```

### 1.8 Rest elements in tuple types

```ts
function tuple<T extends any[]>(...args: T): T {
    return args;
}

const numbers: number[] = getArrayOfNumbers();
const t1 = tuple("foo", 1, true);  // [string, number, boolean]
const t2 = tuple("bar", ...numbers);  // [string, ...number[]]
```

## 2. Advanced

### 2.1 Overloading & Merging

### 2.2 UnionToTuple, TupleToUnion & UnionToIntersection

### 2.3

```ts
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
};
type A = DeepPartial<{
  a: {
    b: {
      e: string;
    }[]
  };
}>
```

* TupletoUnion

```ts
type TupletoUnion0<T> = T extends (infer E)[] ? E : T;
type TupletoUnion1<T> = T extends { [index: number]: infer E } ? E : never;
type A0 = TupletoUnion0<["a" | "b" | number]>;
type A1 = TupletoUnion1<["a" | "b" | number]>;
```

* UnionToTuple

```ts
type UnionToIoF<U> = (U extends any
? (k: (x: U) => void) => void
: never) extends (k: infer I) => void
  ? I
  : never;
type UnionPop<U> = UnionToIoF<U> extends { (a: infer A): void } ? A : never;
type Prepend<U, T extends any[]> = ((a: U, ...r: T) => void) extends (
  ...r: infer R
) => void
  ? R
  : never;
type UnionToTupleRecursively<Union, Result extends any[]> = {
  1: Result;
  0: UnionToTupleRecursively_<Union, UnionPop<Union>, Result>;
}[[Union] extends [never] ? 1 : 0];

type UnionToTupleRecursively_<
  Union,
  Element,
  Result extends any[]
> = UnionToTupleRecursively<
  Exclude<Union, Element>,
  Prepend<Element, Result>
>;

type UnionToTuple<U> = UnionToTupleRecursively<U, []>;

type A = UnionToTuple<"a" | "b" | number>;
```

* UnionToIntersection

```ts
type A = { name: number };
type B = { age: number };

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;
type Result = UnionToIntersection<A | B>; // A & B
```

### 2.3 Covariance & Contravariance
[https://medium.com/@michalskoczylas/covariance-contravariance-and-a-little-bit-of-typescript-2e61f41f6f68](https://medium.com/@michalskoczylas/covariance-contravariance-and-a-little-bit-of-typescript-2e61f41f6f68)
```ts

```

### 2.4 Recursive Type(TypeScript 3.7)

```ts
type Node<T> =
  | {
      key: string;
      value: T;
      children?: Node<T>[];
    }
  | Node<T>[];

const node: Node<string> = {
  key: "foo0",
  value: "fooValue0",
  children: [
    {
      key: "foo1",
      value: "fooValue1",
      children: [
        {
          key: "foo2",
          value: "fooValue2"
        }
      ]
    }
  ]
};
```

## 3. Not Supported Types

* Dependent types

[https://github.com/microsoft/TypeScript/issues/33014](https://github.com/microsoft/TypeScript/issues/33014)

```ts
interface F {
  "t": number,
  "f": boolean,
}

function f<T extends "t" | "f">(
  t: T,
  t2: T, // second key which we do not test
  ft: F[T], // a value of type F[T]
  f: F, // a record of type F
) {
  if (t === "t") {
      const n: number = ft; // a) should be rejected, ft can be bool
      f[t2] = 1; // b) should be rejected, f[t2] can be bool
      return 1; // c) should be accepted
  }
  throw "";
}
```

* Refinement Types

```ts
type Foo = {n : number | 0 < n };
```

* Negated Types

[https://github.com/microsoft/TypeScript/pull/33050](https://github.com/microsoft/TypeScript/pull/33050)

```ts
const foo = <T extends not string>(t: T): T => t;
```

* writeonly

[https://github.com/microsoft/TypeScript/issues/21759](https://github.com/microsoft/TypeScript/issues/21759)

```ts
interface A {
  readonly prop: boolean;
}

const a0: A = {
  prop: false
};

const a1: A = {
  get prop() {
      return false;
  }
};

const a2: A = {
  set prop(value: boolean) {}
};
```

```ts
interface Bar {
  readonly foo: string | null;
  writeonly foo: string | object;
}
```

* Width Subtyping

```js
// @flow
function method(obj: {| foo: string |} | {| bar: number |}) {
  if (obj.foo) {
    // obj.foo: string
  }
}
```

We should use `as` assert in TypeScript for implementation.

```ts
function method(obj: { foo: string } | { bar: number }) {
  const _obj = (obj as { foo: string });
  if (_obj.foo) {
    // obj.foo: string
  }
}
```

* Type Variance

Invariance / Covariance / Contravariance / Bivariance

* Opaque Types

```ts
```

