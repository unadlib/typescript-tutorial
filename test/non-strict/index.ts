{
  const any00: { foo: any } = { foo: 10 };
  const unknown00: {foo: unknown } =  { foo: 10 };


  const val1: string = any00.foo;
  const val2: number = unknown00.foo; // Error

  any00.foo.method();
  unknown00.foo.method(); // Error
}

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

{
  const void00: void = undefined;
  const void01: void = null;
}

{
  const str00: string = undefined;
  const str01: string = null;
}

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

{
  interface Obj0 { [K: string]: any }
  type Obj1 = { [K: string]: any };
  type Obj = { [K in string]: any };
  const obj00: Obj = { a: 1 };
  const obj01: Obj =  [];
  const obj02: Obj =  Object.create(null);
  const obj03: Obj =  new String('');
  const obj04: Obj =  null; 
  const obj05: Obj =  1; // Error
  const obj06: Obj =  '1'; // Error
  const obj07: Obj =  () => {};
  const obj08: Obj =  undefined;
}


{
  const str00: String = 'a';
  const str01: String = new String('a');
}

{
  const str00: string = 'a';
  const str01: string = new String('a'); // Error
}
