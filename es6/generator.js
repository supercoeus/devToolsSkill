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




function animate1(val,time){
	setTimeout(function(){
		console.log(val);
	},time);
}
function animate2(val,time){
	setTimeout(function(){
		console.log(val);
	},time);
}
function animate3(val,time){
	setTimeout(function(){
		console.log(val);
	},time);
}



function* testPromise(){
	yield animate1("step1",1000);
	yield animate2("step2",2000);
	yield animate3("step3",3000);
}

var geneRator=testPromise();
console.log(geneRator.next());//{value:"hello",done:false}
console.log(geneRator.next());//{value:"world",done:false}
console.log(geneRator.next());//{value:"success",done:true}
