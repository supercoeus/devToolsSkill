"use strict";
var fetch=require("node-fetch");


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


function* fetchData(){
	var _t=new Date()*1;
	var url="http://m.maizuo.com/v4/api/film/now-playing?_t="+_t+"&page=1&count=10000";
	var result=yield fetch(url);
	console.log(result);
}


var gData=fetchData();
var result=gData.next();
result.value.then(function(data){
	console.log(data);
}).then(function(data){
	gData.next(data);
});

