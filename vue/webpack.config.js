var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//内置了js压缩 css 就是分离等功能  css和js都会被压缩掉

var fs=require("fs");
/*
entry 可以是字符串  数组 对象


Loaders
test :一个匹配loaders所处理的文件的拓展名的正则表达式
loader：loader的名称
include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
query：为loaders提供额外的设置选项（可选）


http://blog.csdn.net/kun5706947/article/details/52596766

babel的配置放在了.babellrc文件中

html的插件会替换掉hml中的引用js 以及版本号  但是html的放置位置位置有问题
*/



module.exports={
	devtool: 'eval-source-map',
	entry:{
		"/js/page/main":"./buildWebpack/js/page/main.js"
	},
	output:{
		path:"./public/",
		filename:"[name].min.js"
		// filename:"[name]-[hash].min.js"
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:"!style!css"},
			{test:/\.scss$/,loader:"!style!css!scss"},
			{test: /\.json$/,loader: "json"},
			{
				test: /\.js$/,
				loader: "babel",
				exclude: /node_modules/,
				// query: {
	   //        presets: ['es2015']
	   //      }
			},
		]
	},
	plugins: [
    // new HtmlWebpackPlugin({template: __dirname + "/view/index.html"}),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ],
}