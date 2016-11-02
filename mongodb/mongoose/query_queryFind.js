var mongoose=require("mongoose");
var DeepModel=require("./deepModel");//必须使用相对路径
mongoose.connect("127.0.0.1:27017/testDeepData");//使用前，必须连接上

//如何控制输出结果 比如只输出很深结构中的一个数组数据？


//1.name 中包含 姓名
//2.age介于22-28岁
//3. obl.name==姓名2

var query={
	"obj.name":/姓名/,
	// occupation:"obj.arr",
	age:{
		$gte:22,
		$lte:28
	},
	$where:function(a,b){
		var length=this.arr.length>=9;
		var hasNameItem;
		this.obj.arr.forEach(function(item,index){
			if(item.hasName){
				hasNameItem=true;
			}
		});
		return length&&hasNameItem;
	}
};

console.time();
DeepModel.find(query,"occupation obj.arr",function(error,data){
	if(error){
		console.log(error)
	}
	else{
		console.log("query 查询结果："+data.length,data);
		console.timeEnd();
	}
});
