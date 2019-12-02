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
