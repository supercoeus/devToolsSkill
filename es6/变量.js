"use strict";

//let var
var arr1=[];
for(var i=0;i<10;i++){
	arr1[i]=function(){
		console.log(i);
	}
}
arr1[8]();//函数中的i并没有在循环的时候被赋值，而是读取循环过后的i



var arr2=[];
for(let i=0;i<10;i++){
	arr2[i]=function(){
		console.log(i);
	}
}
arr2[8]();



//变量提升 let不存在变量提升

console.log(a);//undefined
console.log(b);//直接报错

var a=1;
let b=2;

//暂时性死区

var tmp=123;
if(true){
	tmp=244;
	let tmp;
	console.log(tmp);//直接报错   代码块内，使用let命令声明变量之前，该变量是不可用的
}