//生成固定数量的模拟数据，方便测试
var mongoose=require("mongoose");
var DeepModel=require("./deepModel.js");


//链接user表  一个文件可以访问多个数据库  以及数据库中的多个集合
mongoose.connect("127.0.0.1:27017/testDeepData");

var length=10;//生成数据的数量
saveData();


function saveData(){
	for(var i=0;i<length;i++){
		var deep1=new DeepModel(createDta());
		deep1.save(function(err,data){
			if(err){
				console.log("保存错误：",err);
			}
			else{
				console.log("保存成功！");
			}
		});
	}
}

//生成随机数
function createNum(start,end){
	var range=Math.random()*(end-start);
	return start+Math.round(range<1?range*10:range);
}

function createDta(){
	
	function createArr(){
		var arr=[];
		var length=createNum(3,10);
		for(var i=0;i<length;i++){
			arr.push(createNum(100,200));
		}

		return arr;
	}

	return {
		name:"姓名"+createNum(1,5),
		age:createNum(20,40),
		arr:createArr(),
		obj:{
			name:"姓名"+createNum(1,5),
			age:createNum(10,20),
			arr:[
				{age:createNum(20,40)},
				{age:createNum(20,40)},
				{age:createNum(20,40),hasName:true},
				{age:createNum(20,40)},
				{age:createNum(20,40)},
				{age:createNum(20,40)},
			]
		}
	}
}

