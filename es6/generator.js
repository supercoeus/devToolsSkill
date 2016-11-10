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
outerGen.next(40);//{value: 41, done: false}





/*

yield之间的代码何时执行？

*/

function* whenRun(){
	yield "step1";
	console.log("between yield");//这个console会在第2次next执行
	yield "step2";
}

var when=whenRun();
when.next();
when.next();//这次才会打印 between yield






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

