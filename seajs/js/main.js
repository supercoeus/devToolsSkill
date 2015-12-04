define(function(require,exports,module){
	var $=require("jquery");
	var sayName=require("sayName");
	console.log(typeof require,typeof $,$,sayName);
	

	module.exports.a=function(){
		console.log("a");
	}
	sayName.say("习大大");
	sayName.say("哈哈");



});