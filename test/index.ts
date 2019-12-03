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
  if (a.foo!.bar!.foobar) {}

  interface B { str: string };
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
  const c = <const>['a', 'b'];
  c[0] = 'f'; // Error
}

namespace TwoWayGenericTypesExample {
  type Foo<T> = T;
  interface Bar<T> {
    t: T;
  }

  const fn = <T>(t: T): T => t; 
  class A<T> {
    t: T;
  };
  new A<number>();

  type C = {num: number};
  class B<T extends C> extends A<T> {}
  new B(); // OK
  new B<{num: number; str: string}>(); // OK
  new B<{str: string}>(); // Error
  new B<any>(); // OK
  new B<never>(); // OK
  new B<{[K: string]: any}>(); // Error
}