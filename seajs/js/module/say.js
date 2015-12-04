define(function(require,exports,module){

	exports.say=function(name){
		console.log(name||"say something");
	}
	exports.said=function(said){
		console.log(said||"has said!");
	}
});