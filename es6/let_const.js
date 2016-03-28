"use strict";

// 1.不存在变量提升  需要先声明定义然后才能使用
// 2.暂时性死区   let命令声明变量之前 独属于死区


if (true) {
	//死区开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError
  console.log(a);//变量提升   undefined

  let tmp; // 死区结束
  var a=456;
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}


if(true){
	console.log(tmp);//报错   在let命令声明tmp之前的代码  都属于死区  会报错
	let tmp=123;
}


// 3.不允许重复声明

function test(){
	var a=213;
	let a=456;
}
test();



//块级作用域
var tmpa = new Date();

function f(){
  console.log(tmpa);
  if (false){
    var tmpa = "hello world";
  }
}

f() // undefined //作用域链 块级作用域 


//块级作用域
var tmpa = new Date();

function ff(){
  console.log(tmpa);
  if (false){
    let tmpa = "hello world";
  }
}

ff() // new Date 


//const和let一样   存在块级作用域的问题 没有变量提升 有暂时性死区

//var声明的变量          会自动添加到global属性上
//let const声明的变量    不会自动添加到global属性上