var http=require("http");

//异步编程遇到的问题
// 1.异常处理
// 2.嵌套过甚
// 3.阻塞代码
// 4.多线程编程


//异步编程解决方案
// a:事件发布/订阅模式
// b:Promise/Deferred
// c:流程控制库


var EventEmitter=require("events").EventEmitter;
var ee=new EventEmitter();
ee.on("a",function(){
	console.log("aaaaa");
});
ee.emit("a");


var server=http.createServer(function(req,res){
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.write("start");

	res.end("end");
});

server.listen(8000,"127.0.0.1");