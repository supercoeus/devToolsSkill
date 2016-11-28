"use strict";
var fetch=require("node-fetch");


/*

generator函数不能解决异步调用的序列化问题，而是用于返回一个状态机 其实提供了一种可以暂停执行的函数

调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象

yield后面可以跟随数据 以及执行函数   不能直接跟随函数  直接跟随函数相当于注册了一个局部函数  但并不会执行

遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值 如果直接跟随一个函数，没有任何实际意义

yield和return的区别 


难点：

1.参数传递问题  传递给了谁？
2.yield和yield之间的代码何时执行？

*/


function* hellowGenerator(){
	yield "hello";
	yield "wor"+"ld";
	

	yield function(){
		console.log("a run function");
	}();

	yield function(){
		console.log("function");
		return "function return"
	}();

	yield function aaa(){
		console.log("not run function");
		return "function return"
	};

	aaa();//函数运行至此报错 因为aaa并没有定义 上面的yield语句后面的函数不会执行  也不会挂载到当前的局部环境中

	return "success";
}

var test=hellowGenerator();


console.log(test.next());//{value:"hello",done:false}
console.log(test.next());//{value:"world",done:false}
console.log(test.next());//{done:false} 
console.log(test.next());//{value:undefined,done:false} 同时有console打印
console.log(test.next());//{value:"function return",done:false}  同时有打印
console.log(test.next());//{value:"success",done:true}

/*
通过循环执行
for(key of test){
	console.log(key);
}


下面的for循环也会暂停执行

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}

*/
function* fetchData(){
	var _t=new Date()*1;
	var url="http://m.maizuo.com/v4/api/film/now-playing?_t="+_t+"&page=1&count=10000";
	var result=yield fetch(url);
	console.log(result);
}


var gData=fetchData();
var result=gData.next();
/*
result.value.then(function(data){
	console.log(data);
}).then(function(data){
	gData.next(data);
});

*/

/*

下面的timeout函数不能用于流程控制
如果一个yield执行了异步调用  下一个yield并不知道上一个异步调用是否完成，所以无法解决回调地狱问题

*/


function *timeout(){
	yield setTimeout(function(){
		console.log(1);
	},1000);

	yield setTimeout(function(){
		console.log(2);
	},500);

}

var timeGen=timeout();
timeGen.next();
timeGen.next();


/*

通过next传递参数  控制内部流程

也许这才是generator的最有用的用法  通过外部传递参数，决定状态机的内部状态  


难点  ：参数传递给了谁？

next的参数会直接让上一次的yield的返回值为这个参数   然后向下执行   如果想第一次执行next就可以传参数 怎么办呢？

*/

function* outerCtrl(){
	for(var i=0;true;i++){
		var a=yield i*2;
		console.log(a);
		if(a){
			i=a;
		}
	}
}

var outerGen=outerCtrl();

outerGen.next();//{value: 0, done: false}
outerGen.next();//{value: 1, done: false}
outerGen.next(40);//{value: 82, done: false}





/*

yield之间的代码何时执行？

*/

function* whenRun(){
	yield "step1";
	console.log("between yield");//这个console会在第2次next执行
	yield "step2";
	yield "step3";
	yield "step4";
}

var when=whenRun();
when.next();
when.next();//这次才会打印 between yield



/*

如何终结遍历器？  return 执行的时候，yield会执行么 yield之间的代码会执行么？
遍历器立马结束并返回传递的结果
when.return(123);//{value:123,done:true}

*/

function* returnGen(){
	console.log(1);
	yield "step1";
	console.log(2);
	yield "step2";
	console.log(3);
	yield "step3";
}

var returng=returnGen();



/*

yield*语句   相当于一个遍历器 遍历后面跟随的结果  
yield* 后面可以跟随generator函数、数组、字符串  

yield* generator();//遍历所有的yield结果
yield* ["a","b","c"];
yield* "abc";


bar中执行了foo  是没有用的
使用了yield*  语句后 相当于把调用的generator的语句放入调用者内部  相当于调用了一个for循环 
使用yield generator()  语句 则会返回一个遍历器对象


如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据。

注意下面三者的区别：
foo();
yield foo();
yield* foo();
var a=yield* foo();


*/


function *foo(){
	console.log("foo1");
	yield "foo1";
	console.log("foo2");
	yield "foo2";

	return "hello"
}

//yield* foo(); 相当于把foo提取进bar里面
function *bar(){
	console.log("bar1");
	yield "bar1";

	foo();//不会有任何效果
	yield foo();//返回一个遍历器对象
	yield* foo();//把foo内部的代码在此处执行
	var a=yield* foo();//会把foo里面的ruturn值赋给a a=hello

	console.log(a,"bar21");

	yield "bar2";
	yield* ["bar3","bar4","bar5"];
	yield* "abcdef";

}


/*
做为对象属性的generator函数

*/

let obj={
	* generatot(){
		yield "a";
		yield "b";
	}
} 

let obj={
	generator:function* (){
		yield "a";
		yield "b";
	}
} 



/*

如何在generator上挂载属性呢？

1.generator内部的this是不会挂载的
*/


function *addKeys(){
	yield 1;
	yield this.a="a";
	yield this.b="b";
}

var add=addKeys.call(addKeys.prototype);

add.next();
add.next();

add.a;
add.b;


/*
generator实现一个状态机，内部状态会轮番切换
*/

var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};



/*

具体应用有哪些？

1.异步操作的同步化表达  ajax  timeout等
2.流程控制
3.部署Iterator接口   可以在任意对象上部署interator接口
4.作为数据结构

*/

//1
function* main() {
  	var result = yield request("http://some.url");
  	var resp = JSON.parse(result);
   console.log(resp.value);

   
}

function request(url) {
  	makeAjaxCall(url, function(response){
    	it.next(response);
  	});
}


var it = main();
it.next();

//2
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});

function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}

scheduler(longRunningTask(initialValue));


// 3

function *interatorObj(obj){
	var keys=Object.keys(obj);
	for(let i=0;i<keys.length;i++){
		yield [keys[i],obj[keys[i]]]
	}
}

var obj={a:1,b:2}

var a=interatorObj(obj);
for(let [key,value] of a){
	console.log(key,value);
}



/*
一个典型的用法
*/

function *timeGen(){
	yield timeout(3000);
	yield timeout(2000);
	yield timeout(1000);
	yield timeout(2000);
	yield timeout(3000);

}


function timeout(time){
	setTimeout(function(){
		console.log(time);
		t.next();
	},time);
}

var t=timeGen();



/*
考题
*/

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var f=foo(5);
f.next();//{ value:6, done:false } 6怎么来的  5 + 1
f.next(12);//{ value:8, done:false } 8怎么来的 2 * 12  / 3
f.next(13);//{ value:42, done:true } 42怎么来的 5 + 24 +13



