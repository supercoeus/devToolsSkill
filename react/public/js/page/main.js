require.config({
	baseUrl:"../public",//以引用该文件的html的路径作为当前相对路径  页面引用jquery和js引用其它js文件的区别
	paths:{
		"jquery":["lib/jquery-1.11.3"],
		"react":["lib/react.min"],
		"xjs":["lib/JSXTransformer"]
	}
});


require(["jquery"],function($){
	$(function(){
		alert(21);
	});
});


require(["jquery","react"],function($,react){
	react.render(<p>234235</p>,document.getElementById("container"));
});