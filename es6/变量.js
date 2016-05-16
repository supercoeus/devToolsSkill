"use strict";

//let var
var arr1=[];
for(var i=0;i<10;i++){
	arr1[i]=function(){
		console.log(i);
	}
}
arr1[8]();//10 函数中的i并没有在循环的时候被赋值，而是读取循环过后的i



var arr2=[];
for(let i=0;i<10;i++){
	arr2[i]=function(){
		console.log(i);
	}
}
arr2[8]();// 8 



//变量提升 let不存在变量提升

console.log(a);//undefined
console.log(b);//直接报错

var a=1;
let b=2;

//暂时性死区 最好的使用习惯是先声明   后使用

var tmp=123;
if(true){
	tmp=244;
	let tmp;
	console.log(tmp);//直接报错   代码块内，使用let命令声明变量之前，该变量是不可用的 
}



//let不允许在同一个区块内同时声明同一个变量

if(true){//报错
	var a=1;
	let a=1;
}


function(a){//报错
	let a=1;
}

function(a){//不报错
	if(true){
		let a=2;
	}
}


function test(){
	let a="testOutside Let";
	function inner(){
		console.log(a);
		a="12312321";
		console.log(a);
	}
	inner();
}
test();//函数内部声明的let可以被该函数内的其他内部函数调用得到



if(true){
	function a(){
		console.log(213213);
	}
}
a();