var gulp=require("gulp");
var plugins=require("gulp-load-plugins");
var reactTrans=require("gulp-react");

gulp.task("jsx",function(){
	gulp.src(["./src/jsx/**/*.jsx"])
	.pipe(reactTrans())
	.pipe(gulp.dest("./public/js/jsx-trs/"));
});


gulp.task("watchJSX",function(){
	gulp.watch("./src/jsx/**/*.jsx",function(){
		gulp.run(["jsx"]);
	})
})