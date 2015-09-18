var gulp=require("gulp");
//需要安装gulp-load-plugins在本地项目中
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();


gulp.task("minify",function(){
	gulp.src("src/js/*.js")
	.pipe(plugins.uglify())
	.pipe(gulp.dest("dis/js"))
});

/****src**
	1.支持多路径的数组集合
	2、支持模糊深度  ** / *   模糊深度会保持源文件的路径深度和和目标文件的路径深度一致 
		** 和***以及** /*的区别
//	3.支持！排除   如!src/css/sass/folder2/*.scss
*/

	//sass模块
gulp.task("scss",function(){
	gulp.src(["src/css/sass/**/*.scss","!src/css/sass/folder2/*.scss","src/css/sass_1/*.scss"])
	.pipe(plugins.scss())
	.pipe(gulp.dest("dis/css"));
});
	
	//clean模块  删除文件和文件夹 ***删除文件和文件夹(文件夹有内容也会删除) **删除文件和空文件夹
gulp.task("cleanAll",function(){
	gulp.src(["dis/css/***","dis/js/*.js"])
	.pipe(plugins.clean());
});


//任务的合并  后面的任务是异步执行的 不一定按照先后顺序完成
gulp.task("all",["scss","minify"]);


//watch 和run方法
gulp.task("watch",function(){
	gulp.watch("src/css/sass/*.scss",function(){
		gulp.run("scss");
	});
});
