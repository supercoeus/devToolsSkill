"use strict";




// Promise的resolve传递的参数是接下来的then方法中传递的参数，
//只能一级级联  怎么实现多级异步调用呢？
//一个一步操作的结果可能是一个值也可能是一个promise实例，如果是一个值的话，promise就终止了then的级联调用


//Promise.prototype.then()
//then方法的第一个参数resolved状态的回调函数 第二个参数是rejected状态的回调函数



// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms,"step1");
//   });
// }

// timeout(2000).then((value) => {//2s之后才会去执行then方法后面的回调
//   console.log(value);
// });




//Promise.prototype.catch()
//catch用于指定发生错误时候的回调函数 
var promise=new Promise(function(resolve,reject){
 	resolve("aaa1");
 	resolve("aaa2");
 	
});


var promiseSomeThingSync=function(val){
	return new Promise(function(resolve,reject){
		resolve(val);
	});
}

promiseSomeThingSync("aaa1").then(function(val){
	console.log(val);
	return promiseSomeThingSync("aaa2");
}).then(function(val){
	console.log(val);
	return promiseSomeThingSync("aaa3");
}).then(function(val){
	console.log(val);
	return promiseSomeThingSync("aaa4");
})


console.log("outer");




//每一个then执行完成后  都必须返回一个promise对象 then中传递的参数是上一个promise的resolve参数
var	p1=function(val,time){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve(val);
		},time);
	});
}

p1("step1",1000)
.then(function(val){
	console.log(val);
	return p1("step2",2000);
})
.then(function(val){
	console.log(val);
	return p1("step3",3000);
})
.then(function(val){
	console.log(val);
	return p1("step4",4000);
})



//一个小技巧  settimeout的第三个参数开始传递的是延时函数的对应参数  所以不需要bind对应的参数了
// setTimeout(test,1000,"test1","test2");
// function test(val1,val2){
//   console.log(val1,val2);
// }

