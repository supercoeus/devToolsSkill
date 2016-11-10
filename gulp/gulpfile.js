var gulp=require("gulp");
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();


var rename=require("gulp-rename");
var minifyCss=require("gulp-minify-css");
var combiner = require('stream-combiner2');

//css压缩  一次性
gulp.task("cssMin",function(){
	var _SRC="src/css/**/*.css";
	var _DEST="public/css";

	gulp.src([_SRC,"!src/css/_ignore/**/*.css"])
	.pipe(plugins.changed(_SRC))
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest(_DEST));
});

//动态监听sass文件修改  编译并压缩
gulp.task("scss",function(){
	var _SRC="src/css/**/*.css";
	var _DEST="public/css";

	gulp.src([_SRC,"!src/css/_ignore/**/*.scss"])
	.pipe(plugins.changed(_SRC))
	.pipe(plugins.sass())
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest(_DEST));

});

//js压缩  一次性
gulp.task("jsMin",function(){
	var _SRC="src/js/**/*.js";
	var _DEST="public/js";

	var combined = combiner.obj([
	   gulp.src(_SRC),
	   plugins.changed(_SRC),
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


	// gulp.src(["build/js/**/*.js"])
	// .pipe(plugins.changed(_DEST))
	// .pipe(plugins.uglify({
	// 	mangle:false
	// }))
	// .pipe(plugins.rename(function(path){
	// 	path.extname=".min.js";//扩展名
	// }))
	// .pipe(gulp.dest(_DEST));
});


//动态监听css文件改动
gulp.task("cssWatch",function(){
	gulp.watch("src/css/**/*.css",["cssMin"],function(){

	});

});
//动态监听scss文件改动
gulp.task("scssWatch",function(){
	gulp.watch("src/css/**/*.scss",["scss"],function(){

	});
	
});

//动态监听js文件改动
gulp.task("jsWatch",function(){
	gulp.watch("src/js/**/*.js",["jsMin"],function(){

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
});