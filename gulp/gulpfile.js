//css压缩                           gulp-minify-css
//sass编译                          gulp-scss
//js压缩                            gulp-uglify
//重命名                            gulp-rename   包括路径  文件名  扩展名   都可以自定义最终结果
//合并 传递合并后后的文件名         gulp-concat  
//md5    	                        gulp-rev 
//编译scss无需刷新浏览器            browser-sync
//启动一个当前路径的服务器环境      browser-sync


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
var revCollector=require("gulp-rev-collector");

var browserSync=require("browser-sync");
var reload=browserSync.reload;
var combiner = require('stream-combiner2');//这个是为了提示错误信息的


var htmlmin = require('gulp-htmlmin');
var hasher = require('gulp-hasher');
var revUrls = require('gulp-rev-urls');


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



//scss编译  css压缩  只修改更改过后的文件  需要安装gulp-changed模块  需要预先知道更改过后的路径 
gulp.task("scss",function(){
	var _DEST="public";
	gulp.src(["src/**/*.scss"])
	.pipe(plugins.changed(_DEST))//预先知道更改过后的路径
	.pipe(plugins.scss())
	.pipe(minifyCss())
	.pipe(plugins.rename(function(path){
		// path.dirname+="/ceshi";在每一个目标文件外面加一层目录  一般不会用到
		// path.basename+=".min";//文件名
		path.extname=".min.css";//扩展名
	}))
	.pipe(plugins.rev())
	.pipe(gulp.dest(_DEST))
	.pipe(plugins.rev.manifest({
		merge:false
	}))//生成一个版本号替换文件的json文件
	.pipe(gulp.dest('./rev')); //保存到某一个目标路径下
	// .pipe(reload({ stream:true }));
});


//js压缩
gulp.task("jsMin",function(){
	var combined = combiner.obj([
	    gulp.src('src/js/*.js'),
	    plugins.uglify(),
	    plugins.rev(),
	    gulp.dest("public/js/"),
	    plugins.rev.manifest({
			merge:false
		}),
	    gulp.dest('./rev')
	]);

	combined.on('error', console.error.bind(console));
	return combined;

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
//这里有一个小坑  就是css的名字最好不要是a.css这样的   因为a-32d11dda.css会最终被替换为a-32d11dda-32d11dda.css  导致有两个md5版本号 
//解决办法  只需要在生成 plugins.rev.manifest  的时候  设置merge为true即可

gulp.task("createMd5File",function(){//这个可以用
	gulp.src(["src/**/*.scss","src/**/*.js"])
	.pipe(plugins.scss())
	.pipe(plugins.rev())
	.pipe(gulp.dest("public"))
	.pipe(plugins.rev.manifest({
		merge:true
	}))//生成一个版本号替换文件的json文件
	.pipe(gulp.dest('./rev')); //保存到某一个目标路径下
});



//替换目标文件的路径引用  替换MD5版本号  由于manifest文件中始终是a.css a-dewd3ed32.css   所以只会在第一次的时候进行替换  
//一旦替换完成后  后面就不会再次替换了 而且 每次更改文件名称后  并不会覆盖原文件  所以需要先删除文件  这样就必须保证编译后的文件夹必须是纯净版的
gulp.task("publishVersion",function(){//这个任务是为了替换页面中的版本号
	var now = Math.round(1000*Math.random());
	var now=new Date();
	var year=now.getFullYear();
	var month=formate(now.getMonth()+1);
	var date=formate(now.getDate());
	var h=formate(now.getHours());
	var m=formate(now.getMinutes());

	var version=year+month+date+h+m;

	gulp.src(["./views/**/*.html"])
	.pipe(revCollector())
	.pipe(plugins.replace(/\.css\?v(=\d+)?/g,".css?v="+version))//替换原理
	.pipe(plugins.replace(/\.js\?v(=\d+)?/g,".js?v="+version))//替换原理
	.pipe(gulp.dest("./views/"));

	function formate(num){
		return num<10?"0"+num:num+"";
	}


});


//把不同深度目录的文件编译到同一个目录下  通过更改路径名称来修改
// gulp.task("inOne",function(){
// 	gulp.src(["src/css/**/*.scss"])
// 	.pipe(plugins.scss())
// 	.pipe(plugins.rename(function(path){
// 		path.dirname="./inOne";
// 	}))
// 	.pipe(gulp.dest("./"));
// });


//编译 当前目录下的所有scss文件
// gulp.task("scssA",function(){
// 	gulp.src(["src/css/***.scss"])
// 	.pipe(plugins.scss())
// 	.pipe(gulp.dest("destA"));
// });


// gulp.task("scssB",function(){
// 	gulp.src(["src/css/*.scss"])
// 	.pipe(plugins.scss())
// 	.pipe(gulp.dest("destB"));
// });


//排除 部分文件
// gulp.task("scssNot",function(){
// 	gulp.src(["src/css/**/*.scss","!src/css/*.scss"])
// 	.pipe(plugins.scss())
// 	.pipe(gulp.dest("destNot"));
// });



	//clean模块  删除文件和文件夹 ***删除文件和文件夹(文件夹有内容也会删除) **删除文件和空文件夹
gulp.task("cleanAll",function(){
	gulp.src(["dest/","dest/***","destA/","destA/***","destB/","destB/***","destNot/","destNot/***","inOne/","inOne/***","md5/","md5/**/*"])
	.pipe(plugins.clean())
	.pipe(plugins.clean());
});


//任务的合并  后面的任务是异步执行的 不一定按照先后顺序完成
gulp.task("all",["scss","scssA","scssB","scssNot"]);


//watch 和run方法
gulp.task("watch",function(){
	gulp.watch("src/css/**/*.scss",["scss"],function(){
		
	});
});


// 启动一个server 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.run(["watch"]);
});