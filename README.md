# typescript-tutorial

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

### 1.4 `extends  ?` / `infer`

### 1.5 `keyof` / `typeof`

### 1.6 `abstract` / `interface` / `class`

