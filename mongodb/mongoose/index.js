var mongoose=require("mongoose");

//链接user表  
var db=mongoose.createConnection("mongodb://127.0.0.1/test");

db.on("error",function(error){
	console.log(error);
});

db.on("open",function(){
	console.log("open");
});


var userSchema=new mongoose.Schema({
	name:String,
	age:Number
});

//将schema发布为model  相当于在user表中创建了abd集合
var userModel=db.model("abd",userSchema);

// 如果该model已经发布 ，则可以直接通过名字索引到，如下
// var userModel=db.model("Person");


// 用model创建entity   Entity是具有具体的数据库操作CRUD的

var userEntity=new userModel({"name":"习大大1","age":57});

userEntity.save();

