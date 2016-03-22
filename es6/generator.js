"use strict";

//generator函数会返回一个遍历器 每次执行遍历器会返回函数内部的一个状态
function* hellowGenerator(){
	yield "hello";
	yield "world";

	return "success";
}

var test=hellowGenerator();

console.log(test.next());//{value:"hello",done:false}
console.log(test.next());//{value:"world",done:false}
console.log(test.next());//{value:"success",done:true}

