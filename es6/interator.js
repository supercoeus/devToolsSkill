
/*
Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环

Iterator只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的
在ES6中，有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被for...of循环遍历，有些就不行（比如对象）
在ES6中 具有遍历器接口的对象有 数组、某些类似数组的对象、Set和Map结构。

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator
*/




let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }




/*
类数组对象部署遍历器接口
*/

let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}

/*
普通对象并不能部署遍历器接口
*/

let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}



