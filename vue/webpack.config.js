var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//内置了js压缩 css 就是分离等功能  css和js都会被压缩掉
var path=require("path");
/*
webpack --watch   会自动监听
webpack   一次性执行



entry 可以是字符串  数组 对象
"/js/page/entry"    entry为打包后文件的名字


output
chunkFilename 未被列在entry中，却又需要被打包出来的文件命名配置



Loaders
test :一个匹配loaders所处理的文件的拓展名的正则表达式
loader：loader的名称
include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
query：为loaders提供额外的设置选项（可选）

alias:别名
避免组件的相互引用路径问题
import 和require的时候的路径名 aliasName/aa/bb/......
scss的import不能用别名


babel的配置放在了.babellrc文件中
html的插件会替换掉hml中的引用js 以及版本号  但是html的放置位置位置有问题


http://blog.csdn.net/kun5706947/article/details/52596766
https://segmentfault.com/a/1190000003985802
https://zhuanlan.zhihu.com/p/20914387?refer=jscss
http://www.cnblogs.com/lvdabao/p/5944420.html      关于打包优化以及一些细节


http://www.jianshu.com/p/271f93b8c051

*/


var srcPath="./buildWebpack/js/page/";
var distPath="./public/";


module.exports={
	// devtool: '#eval-source-map',
	entry:{
		// "page/main":srcPath+"main.js",
		// "page/array":[srcPath+"a.js",srcPath+"b.js",srcPath+"c.js"],
		"app":"./src/main.js"
	},
	output:{
		path:distPath,
		publicPath:"./public/",
		filename:"/js/[name].min.js",
		chunkFilename: "[id].bundle.js"
		// filename:"[name]-[hash].min.js"
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:"!style!css"},
			{test:/\.scss$/,loader:"!style!css!scss"},
			{test: /\.json$/,loader: "json"},
			{test: /\.vue$/,loader: "vue-loader"},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
            loader: "file?name=image/[name].[ext]"
			}
		]
	},
	resolve:{
		extensions:["",".css",".scss",".js",".vue"],
		alias:{
			"components":path.resolve(__dirname,"./src/components/"),
			"vue" : path.resolve(__dirname,'./node_modules/vue/dist/vue'),
			"flexible":path.resolve(__dirname,'./public/js/plugins/flexible/flexible'),
		}
	},
	plugins: [
    // new HtmlWebpackPlugin({template: __dirname + "/view/index.html"}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),//插件去重
    new ExtractTextPlugin("style.css")
  ],
}