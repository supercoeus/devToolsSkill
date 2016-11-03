var mongoose=require("mongoose");
var DeepModel=require("./deepModel");//必须使用相对路径
mongoose.connect("127.0.0.1:27017/testDeepData");//使用前，必须连接上


//默认情况下只会更新第一条数据 怎么更新所有的？ { multi: true }
var query={
	// age:{
	// 	$gte:1,
	// 	$lte:30
	// }
	age:{
		$in:[19,25]
	}
};

// 更新修改器
// $inc 自增1   
// $set 指定键值，不存在就创建
// $unset  删掉一个键值

// 数组修改器  新版中有问题  不用
// $push 给一个键push一个数组成员，不存在会创建




var update={
	$inc:{
		age:1
	}
};

var update={
	$set:{
		age:Math.round(Math.random()*30)
	}
};

// var update={
// 	$push:{
// 		array:10
// 	}
// };

DeepModel.update(query,update,{ multi: true },function(err,data){
	if(err){
		console.log("err:",err);
	}
	else{
		console.log("更新结果：",data);
	}
});

