define(function(require,exports,module){
	var $=require("jquery");
	var $1=require("jquery1");
	var sayName=require("sayName");

	console.log("require:"+require);
	console.log("$:"+$);
	console.log("$1"+$1);
	console.log("sayName:"+sayName);

	module.exports.a=function(){
		console.log("a");
	}
	try{
		var body1=$1("body");
		console.log(body1);
		var body=$("body");
		console.log(body,body1);
	}
	catch(e){
		console.log(e);
	}
	

	sayName.say("习大大");
	sayName.say("哈哈");


});