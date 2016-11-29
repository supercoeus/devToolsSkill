
/*

注意async的写法 和普通函数以及generator函数的区别

async函数返回一个Promise对象，可以使用then方法添加回调函数。
当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

async的await后面紧跟着异步操作，这个异步操作被封装为一个promise对象，promise变为resolved后，流程才得以接着运行


*/

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  await timeout(1000);
  console.log(value)
}

asyncPrint('hello world', 50);



/*

注意点

1.await后面的promise有可能是rejected  所以需要放到try catch里面 如果变为rejected 后面的流程不会运行到

2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();
这种写法会很耗时

改写为

let [foo, bar] = await Promise.all([getFoo(), getBar()]);

3.await只能用在async里面，不然会报错，尤其是嵌套函数


*/


