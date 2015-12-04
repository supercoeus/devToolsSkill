define(function(require,exports,module){
	var $=require("jquery");
	var sayName=require("sayName");

	console.log("require:"+require);
	console.log("$:"+$);
	console.log("sayName:"+sayName);

	module.exports.a=function(){
		console.log("a");
	}
	var body=$("body");
	sayName.say("习大大");
	sayName.say("哈哈");


});