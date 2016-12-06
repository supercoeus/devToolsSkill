var gulp=require("gulp");
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();

var rename=require("gulp-rename");
var minifyCss=require("gulp-minify-css");
var combiner = require('stream-combiner2');

//css压缩  一次性
gulp.task("cssMin",function(){
	var _DEST="public/css";

	gulp.src(["build/css/**/*.css","!build/css/_ignore/**/*.css"])
	.pipe(plugins.changed(_DEST))
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest(_DEST));
});

//动态监听sass文件修改  编译并压缩
gulp.task("scss",function(){
	var _DEST="public/css";
	gulp.src(["build/css/**/*.scss","!build/css/_ignore/**/*.scss"])
	.pipe(plugins.changed(_DEST))
	.pipe(plugins.sass())
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest(_DEST));

});

//js压缩  一次性
gulp.task("jsMin",function(){

	var _DEST="public/js";

	var combined = combiner.obj([
	   gulp.src(["build/js/**/*.js","!build/js/tpl.js"]),
	   plugins.changed(_DEST),
	   plugins.uglify({
			mangle:false
		}),
	   plugins.rename(function(path){
			path.extname=".min.js";//扩展名
		}),
	   gulp.dest(_DEST)
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});


//动态监听css文件改动
gulp.task("cssWatch",function(){
	gulp.watch("build/css/**/*.css",["cssMin"],function(){

	});

});
//动态监听scss文件改动
gulp.task("scssWatch",function(){
	gulp.watch("build/css/**/*.scss",["scss"],function(){

	});

});

//动态监听js文件改动
gulp.task("jsWatch",function(){
	gulp.watch("build/js/**/*.js",["jsMin"],function(){

	});
});

//监听所有改动  js  css scss
gulp.task("allWatch",function(){
	gulp.run(["cssWatch","jsWatch","scssWatch"]);
});



gulp.task("default",function(){
	console.log("请输入具体任务名称");
	console.log("css压缩：gulp cssMin");
	console.log("scss压缩：gulp scss");
	console.log("js压缩：jsMin");

	console.log("scss监听并压缩：gulp scssWatch");
	console.log("css监听并压缩：cssWatch");
	console.log("js监听并压缩：jsWatch");

	console.log("css、js、scss监听并压缩：allWatch");
	console.log("版本发布时添加版本号信息：makeVersion");
});

//替换目标文件的路径引用  替换MD5版本号  由于manifest文件中始终是a.css a-dewd3ed32.css   所以只会在第一次的时候进行替换
//一旦替换完成后  后面就不会再次替换了 而且 每次更改文件名称后  并不会覆盖原文件  所以需要先删除文件  这样就必须保证编译后的文件夹必须是纯净版的
gulp.task("makeVersion",function(){//这个任务是为了替换页面中的版本号
	var now = Math.round(1000*Math.random());
	var now = new Date();
	var year = now.getFullYear();
	var month=formate(now.getMonth()+1);
	var date=formate(now.getDate());
	var h=formate(now.getHours());
	var m=formate(now.getMinutes());

	var version=year+month+date+h+m;

	console.log(version);
	gulp.src(["WEB-INF/html/**/*.html"])
	.pipe(plugins.replace(/\.css(\?v=\d+)?/g,".css?v="+version))//替换原理
	.pipe(plugins.replace(/\.js(\?v=\d+)?/g,".js?v="+version))//替换原理
	.pipe(gulp.dest("./html/"));

	function formate(num){
		return num<10?"0"+num:num+"";
	}
});
