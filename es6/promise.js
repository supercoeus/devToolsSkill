"use strict";




// Promise的resolve传递的参数是接下来的then方法中传递的参数，
//只能一级级联  怎么实现多级异步调用呢？
//一个一步操作的结果可能是一个值也可能是一个promise实例，如果是一个值的话，promise就终止了then的级联调用

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms,"step1");
  });
}

timeout(2000).then((value) => {//2s之后才会去执行then方法后面的回调
  console.log(value);
});


console.log("outer");











//一个小技巧  settimeout的第三个参数开始传递的是延时函数的对应参数  所以不需要bind对应的参数了
setTimeout(test,1000,"test1","test2");
function test(val1,val2){
  console.log(val1,val2);
}

