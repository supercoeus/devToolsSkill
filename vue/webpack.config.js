var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//内置了js压缩 css 就是分离等功能  css和js都会被压缩掉

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


babel的配置放在了.babellrc文件中
html的插件会替换掉hml中的引用js 以及版本号  但是html的放置位置位置有问题


http://blog.csdn.net/kun5706947/article/details/52596766
https://segmentfault.com/a/1190000003985802


*/


var srcPath="./buildWebpack/js/page/";
var distPath="./public/";


module.exports={
	devtool: 'eval-source-map',
	entry:{
		"/js/page/main":srcPath+"main.js",
		"/js/page/array":[srcPath+"a.js",srcPath+"b.js",srcPath+"c.js"]
	},
	output:{
		path:distPath,
		filename:"[name].min.js",
		chunkFilename: "[id].bundle.js"
		// filename:"[name]-[hash].min.js"
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:"!style!css"},
			{test:/\.scss$/,loader:"!style!css!scss"},
			{test: /\.json$/,loader: "json"},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		]
	},
	plugins: [
    // new HtmlWebpackPlugin({template: __dirname + "/view/index.html"}),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ],
}