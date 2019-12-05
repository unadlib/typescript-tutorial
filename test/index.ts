namespace NonGenericTypeExample {
  function getProperty(obj: object, key: string) {
    return obj[key];
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  const a = getProperty(x, "a"); // OK
  const m = getProperty(x, "m"); // OK
}

namespace GenericTypeExample {
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  const a = getProperty(x, "a"); // OK
  const m = getProperty(x, "m"); // Error
}

namespace ExtendsExample {
  type Foo<T> = T extends string ? never : number;
  type Foo0 = Foo<boolean>; // number

  type FooBar<T> = T extends { o: infer O } ? O : never;
  type fooBar0 = FooBar<{ o: { s: string } }>; // { s: string }
}

namespace KeyofTypeofExample {
  type Foo = { n: number; s: string };
  type Keys = keyof Foo; // "n" | "s", union type

  const fn = (s: string) => (e: string): number => e.length + s.length;
  type Fn = typeof fn; // type Fn = (s: string) => (e: string) => number

  const obj = { l0: { l1: { l2: "val" } } };
  type Obj = typeof obj;
  // type Obj = {
  //     l0: {
  //         l1: {
  //             l2: string;
  //         };
  //     };
  // }

  const arr0 = ["a", 1, null, undefined];
  type Arr0 = typeof arr0; // type Arr0 = (string | number)[]

  const arr1 = ["a", 1, null, undefined, {}];
  type Arr1 = typeof arr1; // type Arr1 = {}[]

  const func = <T>(t: T): T => t;
  type Func = typeof func; // type A = <T>(t: T) => T

  class A<T> {
    s: string;
    t: T;
    bar(s: string) {
      return s.length;
    }
  }

  const a = new A();
  type A1 = typeof a; // type A1 = A<unknown>
}

namespace AbstractInerfaceExample {
  interface Foo {
    bar: string;
    foobar: (s: string) => number;
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
}

namespace Assertions {
  const a: { foo?: { bar?: { [K: string]: any } } } = {};
  if (a.foo!.bar!.foobar) {
  }

  interface B {
    str: string;
  }
  const b0 = { num: 1 } as B; // Error
  const b1 = ({ num: 1 } as any) as B;
  const b2 = <B>({ num: 1 } as any);
  const b3: B = { num: 1 } as any;

  let x = "hello" as const;
  x = "world"; // Error
  x = "hello"; // OK

  const c0 = {
    e: 0,
    f: 1
  } as const;
  c0.e = 1; // Error
  const c = <const>["a", "b"];
  c[0] = "f"; // Error
}

namespace TwoWayGenericTypesExample {
  type Foo<T> = T;
  interface Bar<T> {
    t: T;
  }

  const fn = <T>(t: T): T => t;
  class A<T> {
    t: T;
  }
  new A<number>();

  type C = { num: number };
  class B<T extends C> extends A<T> {}
  new B(); // OK
  new B<{ num: number; str: string }>(); // OK
  new B<{ str: string }>(); // Error
  new B<any>(); // OK
  new B<never>(); // OK
  new B<{ [K: string]: any }>(); // Error
}

namespace RecursiveTypeExample {
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
}

namespace RestElementsExample {
  function tuple<T extends any[]>(...args: T): T {
    return args;
  }

  const numbers = [1, 2, 3];
  const t1 = tuple("foo", 1, true); // [string, number, boolean]
  const t2 = tuple("bar", ...numbers); // [string, ...number[]]
}

namespace TupletoUnionExample {
  type TupletoUnion0<T> = T extends (infer E)[] ? E : T;
  type TupletoUnion1<T> = T extends { [index: number]: infer E } ? E : never;
  type A0 = TupletoUnion0<["a" | "b" | number]>;
  type A1 = TupletoUnion1<["a" | "b" | number]>;
}

namespace UnionToTupleExample {
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
}

namespace UnionToIntersectionExample {
  type A = { name: number };
  type B = { age: number };

  type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends (k: infer I) => void
    ? I
    : never;
  type Result = UnionToIntersection<A | B>; // A & B
}
