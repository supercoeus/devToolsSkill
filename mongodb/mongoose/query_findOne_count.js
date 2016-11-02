var mongoose=require("mongoose");
var DeepModel=require("./deepModel.js");
mongoose.connect("127.0.0.1:27017/testDeepData");//使用前，必须连接上

//查询其中一条
DeepModel.findOne({"name":"姓名1"},function(error,data){
	if(error){
		console.log(error);
	}
	else{
		console.log("findOne 查询结果：",data);
	}
});

//获取数量
DeepModel.count({},function(error,data){
	if(error){
		console.log(error)
	}
	else{
		console.log("count 查询结果：",data);
	}
})

