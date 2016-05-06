// 配置文件的配置项


/*
* context:
* entry:指定输入文件
* output:指定输出
* module:配置各种loader
* resolve:主要设置extensions 文件的后缀名称
* plugins:
*/


module.exports={
	context:process.cwd(),
	entry:{//
		a:"./src/js/main.js",//这种情况会把键名a当做输出时候的文件名称  即filename 编译过后是a.js
		// b:"./src/js/fd1/fd1-a.js",
		c:["./src/js/fd1/fd1-a.js","./src/js/fd1/fd2/fd2-b.js"],
		vendor:["jquery","underscore"]
	},
	output:{//参数path：输出路径 filename:输出文件名称  [name]:entry的文件名或者键名  [hash]：base64的哈希值，版本号
		path:__dirname+"/public/js/",
		filename:"[name]-[id].[hash].js"
	}
};

