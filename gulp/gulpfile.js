var gulp=require("gulp");
//需要安装gulp-load-plugins在本地项目中
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();


gulp.task("minify",function(){
	gulp.src("src/js/*.js")
	.pipe(plugins.uglify())
	.pipe(gulp.dest("dis/js"))
});


gulp.task("scss",function(){
	console.log(24);
	gulp.src("src/css/sass/*.scss")
	.pipe(plugins.scss())
	.pipe(gulp.dest("dis/css"));
});

gulp.task("watch",function(){
	gulp.watch("src/css/sass/*.scss",function(){
		gulp.run("scss");
	})
	
})
