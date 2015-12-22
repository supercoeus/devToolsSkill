//css压缩                           gulp-minify-css
//sass编译                          gulp-scss
//js压缩                            gulp-uglify
//重命名                            gulp-rename   包括路径  文件名  扩展名   都可以自定义最终结果
//合并 传递合并后后的文件名         gulp-concat  
//md5    	                        gulp-rev 



//如何获取plugins下面对应的插件？
//如何重命名目标文件？
//如何添加md5版本号?
//如何保持目录一致? 
//如何把不同深度的目录中的文件输出到同一个目录下


var gulp=require("gulp");
var rename=require("gulp-rename");
//需要安装gulp-load-plugins在本地项目中
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();
var minifyCss=require("gulp-minify-css");


/****src**
	1.支持多路径的数组集合
	2、支持模糊深度  ** / *   模糊深度会保持源文件的路径深度和和目标文件的路径深度一致 
		** 和***以及** /*的区别
//	3.支持！排除   如!src/css/sass/folder2/*.scss

	** / *     代表任何深度下的某种文件                任务scss
	***.scss   代表当前目录下的所有scss文件            任务scssA
	***        代表当前目录下的所有文件和文件夹        任务cleanAll
	*.scss     代表当前目录下的所有scss文件            任务scssB
	！         代表非，排除某种文件或者结构            任务scssNot

*/

//scss编译  css压缩
gulp.task("scss",function(){
	gulp.src(["src/**/*.scss"])
	.pipe(plugins.scss())
	.pipe(minifyCss())
	.pipe(gulp.dest("dest"));
});

//js压缩
gulp.task("jsMin",function(){
	gulp.src("src/js/*.js")
	.pipe(plugins.uglify())
	.pipe(gulp.dest("public/js/"))
});



//重命名：路径-文件名-后缀名
gulp.task("rename",function(){
	gulp.src(["src/**/*.scss"])
	.pipe(plugins.scss())
	.pipe(plugins.rename(function(path){
		// path.dirname+="/ceshi";在每一个目标文件外面加一层目录  一般不会用到
		// path.basename+=".min";//文件名
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest("rename"));
});



//md5   会自动把md5时间戳放在文件名称后面  
// md5是根据内容来设置的   如果内容不变 MD5值不变  内容回撤 md5值也会回撤 
gulp.task("md5",function(){
	gulp.src(["src/css/**/*.scss"])
	.pipe(plugins.rev())
	.pipe(gulp.dest("md5"))
});


//把不同深度目录的文件编译到同一个目录下  通过更改路径名称来修改
gulp.task("inOne",function(){
	gulp.src(["src/css/**/*.scss"])
	.pipe(plugins.scss())
	.pipe(plugins.rename(function(path){
		path.dirname="./inOne";
	}))
	.pipe(gulp.dest("./"));
});


//编译 当前目录下的所有scss文件
gulp.task("scssA",function(){
	gulp.src(["src/css/***.scss"])
	.pipe(plugins.scss())
	.pipe(gulp.dest("destA"));
});


gulp.task("scssB",function(){
	gulp.src(["src/css/*.scss"])
	.pipe(plugins.scss())
	.pipe(gulp.dest("destB"));
});


//排除 部分文件
gulp.task("scssNot",function(){
	gulp.src(["src/css/**/*.scss","!src/css/*.scss"])
	.pipe(plugins.scss())
	.pipe(gulp.dest("destNot"));
});



	//clean模块  删除文件和文件夹 ***删除文件和文件夹(文件夹有内容也会删除) **删除文件和空文件夹
gulp.task("cleanAll",function(){
	gulp.src(["dest/***","destA/***","destB/***","destNot/***"])
	.pipe(plugins.clean());
});


//任务的合并  后面的任务是异步执行的 不一定按照先后顺序完成
gulp.task("all",["scss","scssA","scssB","scssNot"]);


//watch 和run方法
gulp.task("watch",function(){
	gulp.watch("src/css/**/*.scss",function(){
		gulp.run("scss");
	});
});
