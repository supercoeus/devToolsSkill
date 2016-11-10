
var fs=require("fs");


var readFile=function (filename){
	return new Promise(function(resolve,reject){
		fs.readFile(filename,function(error,data){
			if(error){
				console.log(error);
				reject(error);
			}
			else{
				resolve(data);
			}
		});
	});
}

var timeout=function(time,cb){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			if(cb){
				resolve(cb());
			}
			else{
				resolve("");
			}
		},time||0);
	});
}

//then 里面可以继续返回promise函数和具体的数据   在接下来的then里面可以接收到对应的参数
//下面的例子可以用在按照某种顺序排列的动画序列 

/* 例子

1.异步读取文件
2.延时任务1
3.延时任务2
3.延时任务3
4.正常数据传递

*/

readFile("./test/txt.txt")
.then(function(data){
	return timeout(1000,function(){
		console.log("step1",data.toString());
		return "step1"
	});
})
.then(function(data){
	return timeout(1000,function(){
		console.log("step2",data);
		return "step2"
	});
})
.then(function(data){
	return timeout(500,function(){
		console.log("step3",data);
		return "step3"
	});
})
.then(function(data){
	console.log("step4",data);
	return "随便什么数据4"
})
.then(function(data){
	console.log("step5",data);
	return "随便什么数据5"
})
.then(function(data){
	console.log("step6",data);
})
.then(function(data){
	console.log("step7",data);
	return "随便什么数据7"
})


/** 
学习地址：
http://www.jianshu.com/p/063f7e490e9a



Promise 对象有以下两个特点。

（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。


（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

api

Promise.resolve()
Promise.reject()
Promise.prototype.then()
Promise.prototype.catch()
Promise.all() // 所有的完成  var p = Promise.all([p1,p2,p3]);
Promise.race() // 竞速，完成一个即可

**/


