var mongoose=require("mongoose");

//链接user表  一个文件可以访问多个数据库  以及数据库中的多个集合
var db=mongoose.createConnection("mongodb://127.0.0.1/user");

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
var userModel=db.model("users",userSchema);

// 如果该model已经发布 ，则可以直接通过名字索引到，如下
// var userModel=db.model("Person");


// 用model创建entity   Entity是具有具体的数据库操作CRUD的

// var userEntity=new userModel({"name":"习大大1","age":57});
// userEntity.save();

var count=10;
var baeAge=20;
for(var i=0;i<count;i++){
	var name="王宇"+i;
	var age=baeAge+i;
	var people=new userModel({"name":name,"age":age});
	people.save();
}

// people1.save();



// var dbA=mongoose.createConnection("mongodb://127.0.0.1/random");
// var citySchema=new mongoose.Schema({
// 	city:String,
// 	year:Number
// });

// var cityModel=dbA.model("number",citySchema);
// var baseYear=2000;
// for(var i=0;i<100000;i++){

// 	var city=Math.random().toFixed(5)*100000;
// 	var year=baseYear+i;
// 	var cityEntity=new cityModel({city:city,year:year});
// 	cityEntity.save();
// }
